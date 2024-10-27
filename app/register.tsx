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

import MyLink from '@/components/common/MyLink'
import MyText from '@/components/common/MyText'
import { height, myDeviceHeight, myDeviceWidth, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IRegisterFormPayload } from '@/contracts/interfaces/register.interface'
import { errorMessage } from '@/contracts/messages'
import { registerSchema } from '@/contracts/validations/auth.validation'
import useAuth from '@/hooks/api/useAuth'

const RegisterScreen = () => {
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IRegisterFormPayload>({
    resolver: yupResolver(registerSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      name: ''
    }
  })

  const onSubmit = async (data: IRegisterFormPayload) => {
    setIsLoading(true)
    const result = await register({
      email: data.email,
      name: data.name,
      password: data.password
    })
    if (typeof result === 'string') {
      setError('root', {
        type: 'manual',
        message: result
      })
    } else {
      router.replace(`/verify?email=${data.email}&screen=register`)
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
        <ScrollView style={{ paddingHorizontal: 20, backgroundColor: '#FFF' }}>
          <MyText
            text='Điền thông tin phía dưới để tham gia trải nghiệm các khóa học tuyệt vời của chúng tôi.'
            styleProps={{ fontSize: width < myDeviceWidth.sm ? 14 : 16, textAlign: 'left', marginVertical: 24 }}
          />
          <View style={{ position: 'relative', marginVertical: 12 }}>
            <MyText
              text='Họ và tên'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  inputMode='text'
                  autoFocus
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='user'
                      size={24}
                      color={myTheme.primary}
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Họ và tên'
                  placeholderTextColor='grey'
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor: errors.name ? 'red' : myTheme.primary,
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
            {errors.name && <MyText text={errors.name?.message || ''} styleProps={{ color: 'red' }} />}
          </View>
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
                  inputMode='email'
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='mail'
                      size={24}
                      color={myTheme.primary}
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
                    borderColor: errors.email || errors.root?.message === errorMessage.ERM019 ? 'red' : myTheme.primary,
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
          <View style={{ position: 'relative', marginVertical: 12 }}>
            <MyText
              text='Xác nhận mật khẩu'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='passwordConfirmation'
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
                      onPress={() => setIsShowPasswordConfirmation(!isShowPasswordConfirmation)}
                      style={{
                        padding: 10,
                        position: 'absolute',
                        top: height < myDeviceHeight.sm ? 26 : 33,
                        right: 10
                      }}
                    >
                      <Feather name={isShowPasswordConfirmation ? 'eye' : 'eye-off'} size={24} color='lightgray' />
                    </TouchableOpacity>
                  }
                  placeholder='Xác nhận mật khẩu'
                  placeholderTextColor='grey'
                  multiline={false}
                  secureTextEntry={!isShowPasswordConfirmation}
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor: errors.passwordConfirmation ? 'red' : myTheme.primary,
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
            {errors.passwordConfirmation && (
              <MyText text={errors.passwordConfirmation?.message || ''} styleProps={{ color: 'red' }} />
            )}
          </View>
          <View style={{ marginTop: 12, gap: 24 }}>
            <Button
              disabled={isLoading}
              backgroundColor={myTheme.primary}
              onPress={handleSubmit(onSubmit)}
              label='Đăng kí'
              size='large'
              style={{
                minWidth: '95%',
                height: 48,
                justifyContent: 'center',
                marginBottom: -40
              }}
              labelStyle={{
                fontFamily: myFontWeight.bold,
                fontSize: 16
              }}
            />
            {errors.root && (
              <MyText
                text={errors.root?.message || ''}
                styleProps={{ color: 'red', textAlign: 'center', marginTop: 36 }}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 2.5,
                marginBottom: 40,
                marginTop: errors.root ? undefined : 40
              }}
            >
              <MyText styleProps={{ fontSize: 16, color: myTextColor.caption }} text='Đã có tài khoản?' />
              <MyLink
                weight={myFontWeight.medium}
                styleProps={{ color: myTextColor.primary, fontSize: 16 }}
                text='Đăng nhập'
                href='/login'
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
