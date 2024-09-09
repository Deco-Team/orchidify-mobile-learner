import Feather from '@expo/vector-icons/Feather'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Button, DateTimePicker, TextField, View } from 'react-native-ui-lib'

import MyLink from '@/components/MyLink'
import MyText from '@/components/MyText'
import { height, myDeviceHeight, myDeviceWidth, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IRegisterFormPayload } from '@/contracts/interfaces/register.interface'
import { errorMessage } from '@/contracts/messages'
import { registerSchema } from '@/contracts/validations/register.validation'
import useUser from '@/hooks/api/useUser'

const RegisterScreen = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { register } = useUser()
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
      phone: '',
      password: '',
      passwordConfirmation: '',
      dateOfBirth: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      name: ''
    }
  })

  const onSubmit = async (data: IRegisterFormPayload) => {
    if (data.password !== data.passwordConfirmation) {
      setError('root', {
        type: 'manual',
        message: errorMessage.ERM030
      })
    } else {
      const result = await register({
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone
      })
      if (typeof result === 'string') {
        setError('root', {
          type: 'manual',
          message: result
        })
      } else {
        Alert.alert('Đăng kí thành công', 'HIHIHI')
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#FFF' }}
      >
        <ScrollView style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FFF' }}>
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
                      y
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
          <View style={{ position: 'relative', marginVertical: 12 }}>
            <MyText
              text='Ngày sinh'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  mode='date'
                  migrateDialog
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='calendar'
                      size={24}
                      color={myTheme.primary}
                      y
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 10))}
                  placeholder='Ngày sinh'
                  placeholderTextColor='grey'
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor: errors.dateOfBirth ? 'red' : myTheme.primary,
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
            {errors.dateOfBirth && <MyText text={errors.dateOfBirth?.message || ''} styleProps={{ color: 'red' }} />}
          </View>
          <View style={{ position: 'relative', marginVertical: 12 }}>
            <MyText
              text='Số điện thoại'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='phone'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  inputMode='tel'
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='phone'
                      size={24}
                      color={myTheme.primary}
                      y
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Số điện thoại'
                  placeholderTextColor='grey'
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor: errors.phone ? 'red' : myTheme.primary,
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
            {errors.phone && <MyText text={errors.phone?.message || ''} styleProps={{ color: 'red' }} />}
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
                      onPress={() => setIsShowPassword(!isShowPassword)}
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, right: 20 }}
                    >
                      <Feather name={isShowPassword ? 'eye' : 'eye-off'} size={24} color='lightgray' />
                    </TouchableOpacity>
                  }
                  placeholder='Xác nhận mật khẩu'
                  placeholderTextColor='grey'
                  multiline={false}
                  secureTextEntry={!isShowPassword}
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderColor:
                      errors.passwordConfirmation || errors.root?.message === errorMessage.ERM030
                        ? 'red'
                        : myTheme.primary,
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
            {errors.password && (
              <MyText text={errors.passwordConfirmation?.message || ''} styleProps={{ color: 'red' }} />
            )}
            {errors.root?.message === errorMessage.ERM030 && (
              <MyText text={errors.root?.message || ''} styleProps={{ color: 'red' }} />
            )}
          </View>
          <View style={{ marginTop: 12, gap: 24 }}>
            <Button
              onPress={handleSubmit(onSubmit)}
              label='Đăng kí'
              size='large'
              style={{
                backgroundColor: myTheme.primary,
                minWidth: '95%',
                height: 48,
                justifyContent: 'center',
                marginBottom: -45
              }}
              labelStyle={{
                fontFamily: myFontWeight.bold,
                fontSize: 16
              }}
            />
            {errors.root?.message !== errorMessage.ERM030 && (
              <MyText
                text={errors.root?.message || ''}
                styleProps={{ color: 'red', textAlign: 'center', marginTop: 48 }}
              />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 2.5, marginBottom: 48 }}>
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen
