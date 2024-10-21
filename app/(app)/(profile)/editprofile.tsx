/* eslint-disable node/handle-callback-err */
import Feather from '@expo/vector-icons/Feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { ImagePickerAsset } from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Avatar, Button, DateTimePicker, TextField, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { height, myDeviceHeight, myFontWeight, myTheme } from '@/contracts/constants'
import { IEditUserPayload, IUser } from '@/contracts/interfaces/user.interface'
import { successMessage } from '@/contracts/messages'
import { userSchema } from '@/contracts/validations/user.validation'
import useMedia from '@/hooks/api/useMedia'
import useUser from '@/hooks/api/useUser'
import { extractMessage, pickImage } from '@/utils'

const EditProfileScreen = () => {
  const { getProfile, editProfile } = useUser()
  const { uploadViaBase64 } = useMedia()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<ImagePickerAsset[]>([])
  const [user, setUser] = useState<IUser>({
    email: '',
    _id: '',
    name: '',
    avatar: '',
    dateOfBirth: new Date(),
    phone: '',
    status: ''
  })
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IEditUserPayload>({
    resolver: yupResolver(userSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      avatar: '',
      dateOfBirth: new Date(),
      name: '',
      phone: ''
    }
  })

  useEffect(() => {
    const getData = async () => {
      const data = await getProfile()
      if (data && typeof data !== 'string') {
        setUser(data)
        setValue('name', data.name)
        setValue('avatar', data.avatar)
        setValue('phone', data.phone)
        setValue('dateOfBirth', new Date(data.dateOfBirth || ''))
      }
    }
    getData()
  }, [getProfile, setValue])

  const onSubmit = async (data: IEditUserPayload) => {
    setIsLoading(true)
    let newImage = data.avatar
    if (image.length !== 0 && image[0].base64 && image[0].fileName) {
      const result = await uploadViaBase64({
        contents: image[0].base64,
        folder: 'user_avatar',
        public_id: image[0].fileName,
        type: 'upload'
      })
      if (typeof result !== 'string' && result?.url) {
        newImage = result.url
      }
    }
    const result = await editProfile({ ...data, avatar: newImage })
    if (typeof result === 'boolean' && result === true) {
      const data = await getProfile()
      if (data && typeof data !== 'string') {
        setUser(data)
        setValue('name', data.name)
        setValue('avatar', data.avatar)
        setValue('phone', data.phone)
        setValue('dateOfBirth', new Date(data.dateOfBirth || ''))
        Alert.alert(extractMessage(successMessage.SSM032, ['Cập nhật']))
      }
    } else {
      setError('root', {
        message: result as string
      })
    }
    setIsLoading(false)
  }
  const handlePickImage = async () => {
    const result = await pickImage()
    if (result) {
      setImage(result)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF' }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ paddingHorizontal: 20, backgroundColor: '#FFF' }}>
          <Avatar
            size={120}
            containerStyle={{
              alignSelf: 'center',
              marginBottom: 10,
              marginTop: 30,
              position: 'relative'
            }}
            onPress={handlePickImage}
            source={{
              uri: image[0]?.uri ? image[0]?.uri : user.avatar ? user.avatar : 'https://avatar.iran.liara.run/public'
            }}
          >
            <Feather
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#FFF',
                borderRadius: 99,
                padding: 5
              }}
              name='settings'
              size={20}
              color={myTheme.primary}
            />
          </Avatar>
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
            <TextField
              leadingAccessory={
                <Feather
                  style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                  name='mail'
                  size={24}
                  color={myTheme.primary}
                />
              }
              disbled
              readonly
              maxLength={50}
              defaultValue={user.email}
              placeholder='Email'
              placeholderTextColor='grey'
              fieldStyle={{
                paddingVertical: 20
              }}
              style={{
                borderStyle: 'solid',
                borderColor: myTheme.primary,
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
            <Feather
              name='check'
              size={24}
              style={{
                padding: 10,
                position: 'absolute',
                top: height < myDeviceHeight.sm ? 26 : 33,
                right: 10
              }}
              color={myTheme.primary}
            />
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
              text='Ngày sinh'
              styleProps={{ position: 'absolute', top: -10, left: 1, fontSize: 16, textAlign: 'left' }}
            />
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  dateFormat='DD/MM/YYYY'
                  mode='date'
                  migrateDialog
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 15 }}
                      name='calendar'
                      size={24}
                      color={myTheme.primary}
                    />
                  }
                  onBlur={onBlur}
                  onChange={onChange}
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
          <View style={{ marginTop: 12, gap: errors.root ? undefined : 24 }}>
            <Button
              disabled={isLoading}
              disabledBackgroundColor='red'
              onPress={handleSubmit(onSubmit)}
              label='Lưu'
              size='large'
              style={{
                backgroundColor: myTheme.primary,
                minWidth: '95%',
                height: 48,
                justifyContent: 'center',
                marginBottom: 40
              }}
              labelStyle={{
                fontFamily: myFontWeight.bold,
                fontSize: 16
              }}
            />
            {errors.root && (
              <MyText
                text={errors.root.message || ''}
                styleProps={{ color: 'red', textAlign: 'center', marginBottom: 30, marginTop: -10 }}
              />
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default EditProfileScreen
