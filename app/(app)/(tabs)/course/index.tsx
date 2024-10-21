import React from 'react'
import { View } from 'react-native-ui-lib'

import MyCourseCard from '@/components/MyCourseCard'
import { myTheme } from '@/contracts/constants'

const CourseScreen = () => {
  return (
    <View style={{ marginBottom: 25, flex: 1, gap: 15, paddingHorizontal: 10 }}>
      <MyCourseCard
        id='123'
        image='https://picsum.photos/100'
        title='Trồng hoaTrồng hoaTrồng hoaTrồng hoaTrồng hoa'
        chipLabel='Kết thúc'
        chipLabelColor={myTheme.red}
        price='145.000đ'
        instructor='PhongNH'
      />
      <MyCourseCard
        id='456'
        image='https://picsum.photos/100'
        title='Trồng cây'
        chipLabel='Đang diễn ra'
        chipLabelColor={myTheme.green}
        price='145.000đ'
        instructor='PhongNH'
      />
      <MyCourseCard
        id='789'
        image='https://picsum.photos/100'
        title='Bón phân'
        chipLabel='Sắp bắt đầu'
        chipLabelColor={myTheme.yellow}
        price='145.000đ'
        instructor='PhongNH'
      />
      <MyCourseCard
        id='123'
        image='https://picsum.photos/100'
        title='Trồng hoaTrồng hoaTrồng hoaTrồng hoaTrồng hoa'
        chipLabel='Kết thúc'
        chipLabelColor={myTheme.red}
        price='145.000đ'
        instructor='PhongNH'
      />
      <MyCourseCard
        id='456'
        image='https://picsum.photos/100'
        title='Trồng cây'
        chipLabel='Đang diễn ra'
        chipLabelColor={myTheme.green}
        price='145.000đ'
        instructor='PhongNH'
      />
    </View>
  )
}

export default CourseScreen
