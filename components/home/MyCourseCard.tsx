import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTextColor, width } from '@/contracts/constants'
interface IMyCourseCard {
  title: string
  instructor: string
  image: string
  id: string
  finalPrice: number
  price: number
  discount: number
}
const MyCourseCard: React.FC<IMyCourseCard> = ({ price, discount, finalPrice, id, image, instructor, title }) => {
  const router = useRouter()

  return (
    <Shadow style={{ width: (width * 7) / 12, borderRadius: 16 }}>
      <TouchableOpacity
        style={{
          minHeight: 240,
          flexDirection: 'column'
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
          style={{ aspectRatio: 16 / 9, borderTopLeftRadius: 16, borderTopRightRadius: 16, width: '100%' }}
          source={image.replace('http://', 'https://')}
        />
        <View style={{ margin: 7.5 }}>
          <MyText
            ellipsizeMode='tail'
            numberOfLines={1}
            text={title}
            styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, paddingRight: 12.5 }}
          />
          <MyText text={instructor} styleProps={{ color: myTextColor.caption, fontSize: 15 }} />
          <MyText
            text={`${finalPrice.toLocaleString()}đ`}
            styleProps={{
              fontFamily: myFontWeight.bold,
              color: myTextColor.primary,
              fontSize: 16
            }}
          />
          {discount !== 0 ? (
            <MyText
              text={`${price.toLocaleString()}đ`}
              styleProps={{
                textDecorationLine: 'line-through',
                color: myTextColor.caption,
                fontSize: 12
              }}
            />
          ) : undefined}
        </View>
      </TouchableOpacity>
    </Shadow>
  )
}

export default MyCourseCard
