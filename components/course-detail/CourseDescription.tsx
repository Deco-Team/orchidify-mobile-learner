import React, { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import MyText from '../MyText'

import { myFontWeight, myTextColor, width } from '@/contracts/constants'

interface ICourseDescription {
  description: string
}

const CourseDescription: React.FC<ICourseDescription> = ({ description }) => {
  const [numberOfLinesCourseDescription, setNumberOfLinesCourseDescription] = useState(0)
  const [readmoreDescription, setReadmoreDescription] = useState<number | undefined>(4)

  const handleCourseDescriptionLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const lineHeight = 18
    const calculatedLines = Math.round(height / lineHeight)
    setNumberOfLinesCourseDescription(calculatedLines)
  }

  return (
    <>
      <MyText
        text='Về khóa học'
        styleProps={{
          fontFamily: myFontWeight.bold,
          fontSize: 16,
          marginTop: 20,
          marginBottom: 10,
          alignSelf: 'flex-start'
        }}
      />
      <MyText
        ellipsizeMode='tail'
        onLayout={handleCourseDescriptionLayout}
        numberOfLines={readmoreDescription}
        styleProps={{
          textAlign: 'justify',
          color: myTextColor.caption,
          width: (width * 11) / 12,
          alignSelf: 'flex-start'
        }}
        text={description || 'Không có mô tả thêm về khóa học này'}
      />
      <TouchableOpacity
        onPress={() => setReadmoreDescription(readmoreDescription ? undefined : 4)}
        style={{ alignSelf: 'flex-start' }}
      >
        {numberOfLinesCourseDescription < 4 ? null : (
          <MyText styleProps={{ color: myTextColor.primary }} text={!readmoreDescription ? 'Rút gọn' : 'Xem thêm'} />
        )}
      </TouchableOpacity>
    </>
  )
}

export default CourseDescription
