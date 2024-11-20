import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native'
import { Avatar, Button } from 'react-native-ui-lib'

import MyText from './MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IClassDetail } from '@/contracts/interfaces/class.interface'
import { IInstructor } from '@/contracts/interfaces/course.interface'

interface IInstructorBio {
  instructorInfo: IInstructor
  contactButton: boolean
  classInfo: IClassDetail
}

const InstructorBio: React.FC<IInstructorBio> = ({ instructorInfo, contactButton, classInfo }) => {
  const [readmoreInstructor, setReadmoreInstructor] = useState<number | undefined>(4)
  const [numberOfLinesInstructor, setNumberOfLinesInstructor] = useState(0)
  const router = useRouter()
  const handleInstructorLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const lineHeight = 18
    const calculatedLines = Math.round(height / lineHeight)
    setNumberOfLinesInstructor(calculatedLines)
  }
  return (
    <View style={{ marginHorizontal: 15 }}>
      <MyText
        text='Về giảng viên'
        styleProps={{
          fontFamily: myFontWeight.bold,
          fontSize: 16,
          marginTop: 20,
          marginBottom: 10,
          alignSelf: 'flex-start'
        }}
      />
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/(app)/(course)/instructor/[instructorId]',
            params: {
              instructorId: instructorInfo._id
            }
          })
        }
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
          width: (width * 11) / 12,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Avatar
            source={instructorInfo.avatar ? { uri: instructorInfo.avatar } : require('@/assets/images/no_avatar.png')}
            name={instructorInfo.name}
          />
          <MyText styleProps={{ fontFamily: myFontWeight.bold }} text={instructorInfo.name} />
        </View>
        {contactButton ? (
          <Button
            label='Trao đổi'
            labelStyle={{ fontFamily: myFontWeight.semiBold }}
            size='medium'
            backgroundColor={myTheme.primary}
            onPress={() => {
              router.push({
                pathname: '/(app)/(class)/class-detail/[classId]/chat-box/[instructorId]',
                params: {
                  instructorId: instructorInfo._id,
                  classId: classInfo._id,
                  title: classInfo.code + ' - ' + instructorInfo.name
                }
              })
            }}
          />
        ) : undefined}
      </TouchableOpacity>
      <MyText
        ellipsizeMode='tail'
        onLayout={handleInstructorLayout}
        numberOfLines={readmoreInstructor}
        styleProps={{
          textAlign: 'justify',
          color: myTextColor.caption,
          width: (width * 11) / 12,
          alignSelf: 'flex-start'
        }}
        text={instructorInfo.bio || 'Không có thông tin về giảng viên này'}
      />

      <TouchableOpacity
        onPress={() => setReadmoreInstructor(readmoreInstructor ? undefined : 4)}
        style={{ alignSelf: 'flex-start' }}
      >
        {numberOfLinesInstructor <= 4 ? null : (
          <MyText styleProps={{ color: myTextColor.primary }} text={!readmoreInstructor ? 'Rút gọn' : 'Xem thêm'} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default InstructorBio
