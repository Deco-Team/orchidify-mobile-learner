import Feather from '@expo/vector-icons/Feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Button, TextField, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { useSession } from '@/contexts/AuthContext'
import { height, myDeviceHeight, myDeviceWidth, myFontWeight, myTheme, width } from '@/contracts/constants'
import { ILoginPayload } from '@/contracts/interfaces/auth.interface'
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
      setError('root', {
        type: 'manual',
        message: result
      })
    } else {
      router.replace('/')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: 'Đăng nhập',
            headerTitleStyle: {
              fontFamily: myFontWeight.bold
            }
          }}
        />
        <View style={{ paddingHorizontal: 20, gap: 24 }}>
          {/* <MyText
            text='Đăng nhập'
            weight={myFontWeight.semiBold}
            styleProps={{ fontSize: 20, textAlign: 'left', marginBottom: 25, marginTop: 25 }}
          /> */}
          <MyText
            text='Xin chào, mừng bạn quay trở lại Orchidify!'
            styleProps={{ fontSize: width < myDeviceWidth.sm ? 14 : 16, textAlign: 'left', marginTop: 24 }}
          />
          <View style={{ position: 'relative' }}>
            <MyText
              text='Email'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='mail'
                      size={24}
                      color={myTheme.primary}
                      y
                    />
                  }
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
          <View style={{ position: 'relative' }}>
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
                  trailingAccessory={
                    <TouchableOpacity
                      onPress={() => setIsShowPassword(!isShowPassword)}
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, right: 20 }}
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
                    borderColor: errors.email ? 'red' : myTheme.primary,
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
          <View style={{ gap: 24 }}>
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen
