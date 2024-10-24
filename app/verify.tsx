/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import { Button, View } from 'react-native-ui-lib'
import { useTimer } from 'react-timer-hook'

import MyText from '@/components/MyText'
import { useSession } from '@/contexts/AuthContext'
import { myDeviceWidth, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import useAuth from '@/hooks/api/useAuth'
const VerifyScreen = () => {
  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 300)

  const { verifyOtp, resendOtp } = useAuth()
  const { login } = useSession()
  const { email, password, page } = useLocalSearchParams<{ email: string; password: string; page: string }>()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { minutes, seconds, isRunning, start, restart } = useTimer({ expiryTimestamp })
  useEffect(() => {
    start
    if (page === 'login') {
      handleResendOtp(false)
    }
  }, [])

  const handleResendOtp = async (isRestart = true) => {
    setIsLoading(true)
    await resendOtp({ email })
    if (isRestart) restart
    setIsLoading(false)
  }
  const handleVerifyOtp = async () => {
    setIsLoading(true)
    const result = await verifyOtp({ code, email })
    if (typeof result === 'string') {
      setError(result)
    } else if (page === 'login') {
      await login(email, password)
      router.replace('/')
    } else {
      router.replace('/login')
    }
    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF' }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ paddingHorizontal: 20, gap: 24, backgroundColor: '#FFF', alignItems: 'center' }}>
          <MyText
            text='Mã xác minh đang được gửi tới email'
            styleProps={{ fontSize: width < myDeviceWidth.sm ? 14 : 16, alignSelf: 'flex-start', marginTop: 24 }}
          />
          <MyText
            text={email || 'example@gmail.com'}
            styleProps={{
              fontFamily: myFontWeight.semiBold,
              fontSize: width < myDeviceWidth.sm ? 14 : 16,
              alignSelf: 'flex-start',
              marginTop: -10,
              marginBottom: 10
            }}
          />
          <OTPTextInput
            handleTextChange={setCode}
            defaultValue={code}
            inputCount={6}
            autoFocus
            tintColor={myTheme.primary}
            textInputStyle={{
              borderWidth: 1.25,
              borderRadius: 5,
              borderBottomWidth: 1.25,
              borderRightWidth: 1.25
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2.5,
              marginTop: -10,
              alignSelf: 'flex-end'
            }}
          >
            <MyText
              text='Gửi lại mã'
              styleProps={{ fontSize: width < myDeviceWidth.sm ? 14 : 16, alignSelf: 'flex-start' }}
            />

            <MyText
              onPress={!isRunning ? handleResendOtp : undefined}
              text={!isRunning ? 'tại đây' : `sau ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
              styleProps={{
                fontSize: width < myDeviceWidth.sm ? 14 : 16,
                alignSelf: 'flex-end',
                color: !isRunning ? myTextColor.primary : undefined
              }}
            />
          </View>
          <Button
            label='Xác minh'
            backgroundColor={myTheme.primary}
            disabled={code.length !== 6 || isLoading}
            size='large'
            style={{
              minWidth: '100%',
              height: 48,
              justifyContent: 'center'
            }}
            onPress={handleVerifyOtp}
            labelStyle={{
              fontFamily: myFontWeight.bold,
              fontSize: 16
            }}
          />
          <MyText text={error} styleProps={{ color: 'red', textAlign: 'center' }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default VerifyScreen
