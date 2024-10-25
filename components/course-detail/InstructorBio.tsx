import React, { useState } from 'react'
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-ui-lib'

import MyText from '../MyText'

import { myFontWeight, myTextColor, width } from '@/contracts/constants'
import { IInstructor } from '@/contracts/interfaces/course.interface'

interface IInstructorBio {
  instructorInfo: IInstructor
}

const InstructorBio: React.FC<IInstructorBio> = ({ instructorInfo }) => {
  const [readmoreInstructor, setReadmoreInstructor] = useState<number | undefined>(4)
  const [numberOfLinesInstructor, setNumberOfLinesInstructor] = useState(0)

  const handleInstructorLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const lineHeight = 18
    const calculatedLines = Math.round(height / lineHeight)
    setNumberOfLinesInstructor(calculatedLines)
  }
  return (
    <>
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
      <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 10, gap: 10, alignItems: 'center' }}>
        <Avatar
          source={{
            uri: instructorInfo.avatar
          }}
        />
        <MyText styleProps={{ fontFamily: myFontWeight.bold }} text={instructorInfo.name} />
      </View>
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
    </>
  )
}

export default InstructorBio
