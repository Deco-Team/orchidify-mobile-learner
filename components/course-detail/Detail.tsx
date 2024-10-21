import { useState } from 'react'
import { Avatar, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { myFontWeight, myTextColor } from '@/contracts/constants'

const Detail = () => {
  const [isReadMoreCourse, setIsReadMoreCourse] = useState(false)
  const [isReadMoreInstructor, setIsReadMoreInstructor] = useState(false)
  return (
    <View style={{ marginTop: 15, flex: 1 }}>
      <MyText text='Về khóa học' styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, marginBottom: 10 }} />
      <MyText
        ellipsizeMode='tail'
        numberOfLines={isReadMoreCourse ? undefined : 3}
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum iure, facilis temporibus asperiores doloribus quidem labore libero sequi, ut facere nostrum recusandae velit placeat? Doloribus suscipit provident veritatis dolore libero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex voluptas provident culpa recusandae aliquid optio tenetur eum temporibus quisquam pariatur ea, atque fuga ab. Aliquid ex odit enim repellat!'
        styleProps={{ textAlign: 'justify', marginRight: 5, marginBottom: isReadMoreCourse ? 15 : undefined }}
      />
      {!isReadMoreCourse && (
        <MyText
          onPress={() => setIsReadMoreCourse(true)}
          ellipsizeMode='tail'
          text='Xem thêm...'
          styleProps={{
            textAlign: 'justify',
            marginRight: 5,
            fontFamily: myFontWeight.bold,
            color: myTextColor.primary,
            marginBottom: 15
          }}
        />
      )}
      <MyText text='Giảng viên' styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, marginBottom: 10 }} />
      <View style={{ flexDirection: 'row', marginVertical: 5, marginBottom: 10, gap: 10 }}>
        <Avatar source={{ uri: 'https://picsum.photos/200' }} />
        <View>
          <MyText text='PhongNH' styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18 }} />
          <MyText text='Senior Developer' />
        </View>
      </View>
      <MyText
        ellipsizeMode='tail'
        numberOfLines={isReadMoreInstructor ? undefined : 3}
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum iure, facilis temporibus asperiores doloribus quidem labore libero sequi, ut facere nostrum recusandae velit placeat? Doloribus suscipit provident veritatis dolore libero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex voluptas provident culpa recusandae aliquid optio tenetur eum temporibus quisquam pariatur ea, atque fuga ab. Aliquid ex odit enim repellat!'
        styleProps={{ textAlign: 'justify', marginRight: 5, marginBottom: isReadMoreInstructor ? 15 : undefined }}
      />
      {!isReadMoreInstructor && (
        <MyText
          onPress={() => setIsReadMoreInstructor(true)}
          ellipsizeMode='tail'
          text='Xem thêm...'
          styleProps={{ marginRight: 5, fontFamily: myFontWeight.bold, color: myTextColor.primary }}
        />
      )}
    </View>
  )
}

export default Detail
