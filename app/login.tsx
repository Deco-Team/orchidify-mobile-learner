import Feather from '@expo/vector-icons/Feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Button, TextField, View } from 'react-native-ui-lib'

import MyLink from '@/components/MyLink'
import MyText from '@/components/MyText'
import { useSession } from '@/contexts/AuthContext'
import { height, myDeviceHeight, myDeviceWidth, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { ILoginPayload } from '@/contracts/interfaces/auth.interface'
import { errorMessage } from '@/contracts/messages'
import { authSchema } from '@/contracts/validations/auth.validation'

const LoginScreen = () => {
  const { login } = useSession()
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ILoginPayload>({
    resolver: yupResolver(authSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: ILoginPayload) => {
    const result = await login(data.email, data.password)
    if (typeof result === 'string') {
      if (result.includes(errorMessage.ERM029)) {
        router.replace(`/verify?email=${data.email}&password=${data.password}&page=login`)
      } else {
        setError('root', {
          type: 'manual',
          message: result
        })
      }
    } else {
      router.replace('/')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF' }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flexDirection: 'column', paddingHorizontal: 20, backgroundColor: '#FFF' }}>
          <MyText
            text='Xin chào, mừng bạn quay trở lại Orchidify!'
            styleProps={{ fontSize: width < myDeviceWidth.sm ? 14 : 16, textAlign: 'left', marginVertical: 24 }}
          />
          <View style={{ position: 'relative', marginVertical: 12 }}>
            <MyText
              text='Email'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  autoFocus
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='mail'
                      size={24}
                      color={myTheme.primary}
                    />
                  }
                  inputMode='email'
                  maxLength={50}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Email'
                  placeholderTextColor='grey'
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor: errors.email ? 'red' : myTheme.primary,
                    borderWidth: 1,
                    borderRadius: 7,
                    height: height < myDeviceHeight.sm ? 60 : 70,
                    paddingLeft: 55,
                    paddingRight: 15,
                    fontSize: 16,
                    overflow: 'hidden',
                    fontFamily: myFontWeight.regular
                  }}
                />
              )}
            />
            {errors.email && <MyText text={errors.email.message || ''} styleProps={{ color: 'red' }} />}
          </View>
          <View style={{ position: 'relative', marginVertical: 12 }}>
            <MyText
              text='Mật khẩu'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='lock'
                      size={24}
                      color={myTheme.primary}
                    />
                  }
                  maxLength={50}
                  trailingAccessory={
                    <TouchableOpacity
                      onPress={() => setIsShowPassword(!isShowPassword)}
                      style={{
                        padding: 10,
                        position: 'absolute',
                        top: height < myDeviceHeight.sm ? 26 : 33,
                        right: 10
                      }}
                    >
                      <Feather name={isShowPassword ? 'eye' : 'eye-off'} size={24} color='lightgray' />
                    </TouchableOpacity>
                  }
                  placeholder='Mật khẩu'
                  placeholderTextColor='grey'
                  multiline={false}
                  secureTextEntry={!isShowPassword}
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor: errors.password ? 'red' : myTheme.primary,
                    borderWidth: 1,
                    borderRadius: 7,
                    height: height < myDeviceHeight.sm ? 60 : 70,
                    paddingLeft: 55,
                    paddingRight: 50,
                    fontSize: 16,
                    overflow: 'hidden',
                    fontFamily: myFontWeight.regular
                  }}
                />
              )}
            />
            {errors.password && <MyText text={errors.password.message || ''} styleProps={{ color: 'red' }} />}
          </View>
          <View style={{ marginTop: 12, gap: 24 }}>
            <Button
              onPress={handleSubmit(onSubmit)}
              label='Đăng nhập'
              size='large'
              style={{
                backgroundColor: myTheme.primary,
                minWidth: '95%',
                height: 48,
                justifyContent: 'center'
              }}
              labelStyle={{
                fontFamily: myFontWeight.bold,
                fontSize: 16
              }}
            />
            {errors.root && (
              <MyText text={errors.root.message || ''} styleProps={{ color: 'red', textAlign: 'center' }} />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 2.5 }}>
              <MyText styleProps={{ fontSize: 16, color: myTextColor.caption }} text='Chưa có tài khoản?' />
              <MyLink
                weight={myFontWeight.medium}
                styleProps={{ color: myTextColor.primary, fontSize: 16, marginBottom: 40 }}
                text='Đăng kí'
                href='/register'
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
