import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, width } from '@/contracts/constants'

interface IMyCourseCard {
  title: string
  instructor: string
  price: number
  image: string
  id: string
  finalPrice: number
  discount: number
}

const MyCourseCard = (props: IMyCourseCard) => {
  const { title, instructor, image, id } = props
  const router = useRouter()
  return (
    <Shadow style={{ width: (width * 11) / 12 }}>
      <TouchableOpacity
        style={{
          minHeight: 125,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() =>
          router.push({
            pathname: '/(app)/(course)/course-detail/[courseId]',
            params: {
              courseId: id,
              title
            }
          })
        }
      >
        <Image
          source={image.replace('http://', 'https://')}
          style={{ width: 100, height: 100, borderRadius: 16, margin: 12.5, marginRight: 7.5 }}
        />
        <View style={{ flex: 1 }}>
          <MyText
            ellipsizeMode='tail'
            numberOfLines={1}
            text={title}
            styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, paddingRight: 12.5 }}
          />
          <MyText text={instructor} styleProps={{ color: myTextColor.caption, fontSize: 15 }} />
          <View
            style={{
              flex: 1,
              marginTop: 20,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'baseline',
              maxHeight: 25,
              paddingRight: 12.5,
              gap: 5
            }}
          >
            <MyText
              text={`${props.finalPrice.toLocaleString()}đ`}
              styleProps={{
                fontFamily: myFontWeight.bold,
                color: myTextColor.primary,
                fontSize: 16
              }}
            />
            {props.discount !== 0 ? (
              <MyText
                text={`${props.price.toLocaleString()}đ`}
                styleProps={{
                  textDecorationLine: 'line-through',
                  color: myTextColor.caption,
                  fontSize: 12
                }}
              />
            ) : undefined}
          </View>
        </View>
      </TouchableOpacity>
    </Shadow>
  )
}

export default MyCourseCard
