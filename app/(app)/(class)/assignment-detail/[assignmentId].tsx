import { useActionSheet } from '@expo/react-native-action-sheet'
import { Feather } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import dayjs from 'dayjs'
import { Image } from 'expo-image'
import { ImagePickerAsset } from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar, Badge, Button, LoaderScreen, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { CLASS_STATUS, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IAssignment } from '@/contracts/interfaces/class.interface'
import { successMessage } from '@/contracts/messages'
import useClass from '@/hooks/api/useClass'
import useMedia from '@/hooks/api/useMedia'
import { extractMessage, pickImage, takePhoto } from '@/utils'

const defaultAssignmentDetail: IAssignment = {
  _id: '',
  attachments: [],
  description: '',
  submission: null,
  title: '',
  instructor: {
    _id: '',
    name: '',
    idCardPhoto: '',
    avatar: ''
  }
}

const AssignmentDetailScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { getAssignmentDetail } = useClass()
  const { assignmentId, classId, sessionNumber, sessionTitle, classStatus } = useLocalSearchParams()
  const [data, setData] = useState<IAssignment>(defaultAssignmentDetail)
  const [assignmentSubmission, setAssignmentSubmission] = useState(true)
  const [image, setImage] = useState<ImagePickerAsset[]>([])
  const { uploadViaBase64 } = useMedia()
  const { submitAssignment } = useClass()
  const { showActionSheetWithOptions } = useActionSheet()

  const router = useRouter()

  const handlePickImage = async () => {
    const result = await pickImage()
    if (result) {
      setImage(result)
    }
  }
  const handleOpenBrowser = async (url: string, isMedia = false) => {
    if (isMedia) return await WebBrowser.openBrowserAsync(url)
    return await WebBrowser.openBrowserAsync(`https://docs.google.com/viewerng/viewer?embedded=true&url=${url}`)
  }

  const handleTakePhoto = async () => {
    const result = await takePhoto()
    if (result) {
      setImage(result)
    }
  }

  const onPress = () => {
    const options = ['Tải ảnh từ thư viện', 'Chụp ảnh', 'Hủy']
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: myTheme.red
      },
      async (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            handlePickImage()
            break
          case 1:
            handleTakePhoto()
            break
          case cancelButtonIndex:
            break
        }
      }
    )
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const assignmentDetail = await getAssignmentDetail(assignmentId as string, classId as string)
      if (assignmentDetail && typeof assignmentDetail !== 'string') {
        setData(assignmentDetail)
      }
      setIsLoading(false)
    })()
  }, [classId, getAssignmentDetail, assignmentId])

  const handleSubmitAssignment = async () => {
    setIsLoading(true)
    if (image.length !== 0 && image[0].base64 && image[0].fileName) {
      const media = await uploadViaBase64({
        contents: image[0].base64,
        folder: 'assignments',
        public_id: image[0].fileName,
        type: 'upload'
      })
      if (typeof media !== 'string' && media?.url) {
        const result = await submitAssignment(
          {
            assignmentId: assignmentId as string,
            attachments: [media]
          },
          classId as string
        )
        if (typeof result === 'boolean' && result === true) {
          Alert.alert('Thành công', extractMessage(successMessage.SSM032, ['Nộp bài']))
          router.back()
        } else if (typeof result === 'string') {
          Alert.alert('Đã xảy ra lỗi', result)
          router.back()
        }
      }
    }
    setIsLoading(false)
  }

  const handleOpenSubmission = () => {
    setAssignmentSubmission(false)
  }

  return (
    <>
      {isLoading ? (
        <LoaderScreen
          size='large'
          message='Đang tải...'
          color={myTheme.primary}
          messageStyle={{ fontFamily: myFontWeight.regular }}
        />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: '#FFF' }}
          keyboardVerticalOffset={100}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: 'flex-start',
              flexGrow: 1,
              paddingHorizontal: 15,
              position: 'relative',
              gap: 16,
              paddingTop: 10,
              paddingBottom: 32
            }}
          >
            <MyText
              text={`${sessionNumber} - ${sessionTitle}`}
              weight={myFontWeight.bold}
              styleProps={{ fontSize: 16 }}
            />
            <MyText text={data.title} weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            <MyText text={data.description} styleProps={{ color: myTextColor.caption }} />
            {data.deadline ? (
              <MyText
                text={`Thời hạn: ${dayjs(data.deadline).format('HH:mm DD/MM/YYYY')}`}
                styleProps={{ color: myTheme.red }}
              />
            ) : undefined}
            <MyText text='Tệp đính kèm' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            {data.attachments.length > 0
              ? data.attachments.map((value, i) => {
                  switch (value.resource_type) {
                    case 'image':
                      return (
                        <View
                          backgroundColor='white'
                          style={{
                            elevation: 5,
                            width: (width * 11) / 12,
                            borderRadius: 16,
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            columnGap: 10,
                            alignItems: 'center',
                            paddingVertical: 15
                          }}
                        >
                          <TouchableOpacity key={i} onPress={() => handleOpenBrowser(value.url, true)}>
                            <Badge
                              customElement={<Feather name='image' size={20} color={myTheme.primary} />}
                              backgroundColor={myTheme.lightPrimary}
                              size={35}
                              borderRadius={999}
                            />
                            <MyText
                              text={value.original_filename}
                              weight={myFontWeight.semiBold}
                              styleProps={{ fontSize: 14 }}
                            />{' '}
                          </TouchableOpacity>
                        </View>
                      )
                    case 'video':
                      return (
                        <View
                          backgroundColor='white'
                          style={{
                            elevation: 5,

                            width: (width * 11) / 12,
                            borderRadius: 16,
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            columnGap: 10,
                            alignItems: 'center',
                            paddingVertical: 15
                          }}
                        >
                          {' '}
                          <TouchableOpacity onPress={() => handleOpenBrowser(value.url, true)}>
                            <Badge
                              customElement={<Feather name='video' size={20} color={myTheme.primary} />}
                              backgroundColor={myTheme.lightPrimary}
                              size={35}
                              borderRadius={999}
                            />
                            <MyText
                              text={value.original_filename}
                              weight={myFontWeight.semiBold}
                              styleProps={{ fontSize: 14 }}
                            />{' '}
                          </TouchableOpacity>
                        </View>
                      )
                    case 'raw':
                      return (
                        <View
                          backgroundColor='white'
                          style={{
                            elevation: 5,

                            width: (width * 11) / 12,
                            borderRadius: 16,
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            columnGap: 10,
                            alignItems: 'center',
                            paddingVertical: 15
                          }}
                        >
                          {' '}
                          <TouchableOpacity onPress={() => handleOpenBrowser(value.url)}>
                            <Badge
                              customElement={<Feather name='file-text' size={20} color={myTheme.primary} />}
                              backgroundColor={myTheme.lightPrimary}
                              size={35}
                              borderRadius={999}
                            />
                            <MyText
                              text={value.original_filename}
                              weight={myFontWeight.semiBold}
                              styleProps={{ fontSize: 14 }}
                            />{' '}
                          </TouchableOpacity>
                        </View>
                      )
                  }
                })
              : undefined}
            {image[0]?.uri ? (
              <MyText text='Tải ảnh' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            ) : undefined}
            {image[0]?.uri ? (
              <Image
                style={{ aspectRatio: '16/9', borderRadius: 16, width: (width * 11) / 12 }}
                source={image[0]?.uri.replace('http://', 'https://')}
              />
            ) : undefined}
            {data.submission ? (
              <MyText text='Bài làm đã nộp' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            ) : undefined}
            {data.submission ? (
              <Image
                style={{ aspectRatio: '16/9', borderRadius: 16, width: (width * 11) / 12 }}
                source={data.submission.attachments[0].url.replace('http://', 'https://')}
              />
            ) : undefined}
            {!assignmentSubmission ? (
              <View
                backgroundColor='white'
                style={{
                  elevation: 5,

                  width: (width * 11) / 12,
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 16,
                  paddingVertical: 16
                }}
              >
                <TouchableOpacity onPress={onPress}>
                  <Entypo name='upload-to-cloud' size={60} color={myTheme.primary} />
                  <MyText
                    text={image[0]?.uri ? 'Nhấn vào để thay đổi bài nộp' : 'Nhấn vào để tải lên'}
                    weight={myFontWeight.semiBold}
                    styleProps={{ fontSize: 14 }}
                  />{' '}
                </TouchableOpacity>
              </View>
            ) : undefined}
            {data.submission?.point && data.submission?.feedback ? (
              <View style={{ gap: 10, width: '100%' }}>
                <MyText text='Nhận xét của giảng viên' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Avatar
                    source={
                      data.instructor.avatar
                        ? { uri: data.instructor.avatar.replace('http://', 'https://') }
                        : require('@/assets/images/no_avatar.png')
                    }
                  />
                  <MyText styleProps={{ fontFamily: myFontWeight.bold }} text={data.instructor.name} />
                </View>
                <MyText
                  text={`Điểm: ${data.submission?.point}/10`}
                  weight={myFontWeight.bold}
                  styleProps={{ fontSize: 14 }}
                />
                <MyText text='Nhận xét:' weight={myFontWeight.bold} styleProps={{ fontSize: 14 }} />
                <MyText text={data.submission.feedback} styleProps={{ fontSize: 14, color: myTextColor.caption }} />
                <MyText
                  text={dayjs(data.submission.updatedAt).format('DD/MM/YYYY HH:MM:ss')}
                  styleProps={{ fontSize: 12, color: myTextColor.caption, alignSelf: 'flex-end' }}
                />
              </View>
            ) : undefined}
          </ScrollView>
          {(assignmentSubmission && classStatus === CLASS_STATUS.IN_PROGRESS && !data.submission) || image[0]?.uri ? (
            <View backgroundColor='white' style={{ elevation: 5, width, alignItems: 'center', paddingVertical: 10 }}>
              <Button
                disabled={isLoading}
                onPress={image[0]?.uri ? handleSubmitAssignment : handleOpenSubmission}
                labelStyle={{ fontFamily: myFontWeight.bold }}
                backgroundColor={myTheme.primary}
                style={{ width: (width * 11) / 12 }}
                label={image[0]?.uri ? 'Nộp bài' : 'Bài làm'}
              />
            </View>
          ) : undefined}
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default AssignmentDetailScreen
