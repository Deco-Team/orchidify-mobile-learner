import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Chip, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { myFontWeight, myTextColor, myTheme } from '@/contracts/constants'

interface IMyCourseCard {
  title: string
  instructor: string
  price: number
  publishStatus?: boolean
  image: string
  id: string
}

const MyCourseCard = (props: IMyCourseCard) => {
  const { title, instructor, price, image, id, publishStatus = false } = props
  const router = useRouter()
  return (
    <Shadow style={{ minWidth: '100%' }}>
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
        <Image source={image} style={{ width: 100, height: 100, borderRadius: 16, margin: 12.5, marginRight: 7.5 }} />
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
              alignItems: 'center',
              justifyContent: 'space-between',
              maxHeight: 25,
              paddingRight: 12.5
            }}
          >
            <MyText
              text={`${price.toLocaleString()}đ`}
              styleProps={{
                fontFamily: myFontWeight.bold,
                color: myTextColor.primary,
                fontSize: 18
              }}
            />
            {publishStatus && (
              <View style={{ alignItems: 'center', gap: 2 }}>
                <Chip
                  label='Sắp bắt đầu'
                  backgroundColor={myTheme.yellow}
                  containerStyle={{ borderWidth: 0 }}
                  labelStyle={{ color: '#FFF', fontFamily: myFontWeight.semiBold }}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Shadow>
  )
}

export default MyCourseCard
