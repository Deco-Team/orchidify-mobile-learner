import { useActionSheet } from '@expo/react-native-action-sheet'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import { ImagePickerAsset } from 'expo-image-picker'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Button, LoaderScreen } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IAssignment } from '@/contracts/interfaces/class.interface'
import useClass from '@/hooks/api/useClass'
import { pickImage, takePhoto } from '@/utils'

const defaultAssignmentDetail: IAssignment = {
  _id: '',
  attachments: [],
  description: '',
  title: ''
}

const AssignmentDetailScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { getAssignmentDetail } = useClass()
  const { assignmentId, classId, sessionNumber, sessionTitle } = useLocalSearchParams()
  const [data, setData] = useState<IAssignment>(defaultAssignmentDetail)
  const [assignmentSubmission, setAssignmentSubmission] = useState(true)
  const [image, setImage] = useState<ImagePickerAsset[]>([])

  const { showActionSheetWithOptions } = useActionSheet()

  const handlePickImage = async () => {
    const result = await pickImage()
    if (result) {
      setImage(result)
    }
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
        console.log(assignmentDetail.attachments[0].resource_type)
        setData(assignmentDetail)
      }
      setIsLoading(false)
    })()
  }, [classId, getAssignmentDetail, assignmentId])

  const handleSubmitAssignment = () => {
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
              gap: 10,
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
            <MyText text={data.description} styleProps={{ color: myTextColor.caption, marginBottom: 16 }} />
            <MyText text='Tệp đính kèm' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            {data.attachments.length > 0
              ? data.attachments.map((value) => (
                  <Image
                    style={{ aspectRatio: '16/9', borderRadius: 16, width: (width * 11) / 12, marginBottom: 16 }}
                    source={value.url}
                  />
                ))
              : undefined}
            <MyText text='Tải ảnh' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            {image[0]?.uri ? (
              <Image
                style={{ aspectRatio: '16/9', borderRadius: 16, width: (width * 11) / 12, marginBottom: 8 }}
                source={image[0]?.uri}
              />
            ) : undefined}
            {!assignmentSubmission ? (
              <TouchableOpacity onPress={onPress}>
                <Shadow
                  style={{
                    width: (width * 11) / 12,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    paddingVertical: 16
                  }}
                >
                  <Entypo name='upload-to-cloud' size={60} color={myTheme.primary} />
                  <MyText
                    text={image[0]?.uri ? 'Nhấn vào để thay đổi bài nộp' : 'Nhấn vào để tải lên'}
                    weight={myFontWeight.semiBold}
                    styleProps={{ fontSize: 14 }}
                  />
                </Shadow>
              </TouchableOpacity>
            ) : undefined}
          </ScrollView>
          {assignmentSubmission ? (
            <Shadow style={{ width, alignItems: 'center', paddingVertical: 10 }}>
              <Button
                onPress={handleSubmitAssignment}
                labelStyle={{ fontFamily: myFontWeight.bold }}
                backgroundColor={myTheme.primary}
                style={{ width: (width * 11) / 12 }}
                label='Bài làm'
              />
            </Shadow>
          ) : undefined}
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default AssignmentDetailScreen
