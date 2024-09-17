import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Chip, View } from 'react-native-ui-lib'

import MyText from './MyText'

import { myFontWeight, myTextColor } from '@/contracts/constants'

interface IMyCourseCard {
  title: string
  instructor: string
  price: string
  chipLabel: string
  chipLabelColor: string
  startDate?: string
  image: string
  id: string
}

const MyCourseCard = (props: IMyCourseCard) => {
  const { title, instructor, price, chipLabel, chipLabelColor, startDate, image, id } = props
  const router = useRouter()
  return (
    <Shadow style={{ minWidth: '100%' }}>
      <TouchableOpacity
        style={{
          minHeight: 125,
          borderRadius: 15,
          flexDirection: 'row'
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
        <Image source={image} style={{ width: 100, height: 100, borderRadius: 15, margin: 12.5, marginRight: 7.5 }} />
        <View style={{ flex: 1, marginTop: 15 }}>
          <MyText text={title} styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18 }} />
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
              paddingRight: 12.5,
              marginBottom: startDate ? 25 : 12.5
            }}
          >
            <MyText
              text={price}
              styleProps={{
                fontFamily: myFontWeight.bold,
                color: myTextColor.primary,
                fontSize: 16
              }}
            />
            <View style={{ alignItems: 'center', gap: 2 }}>
              <Chip
                label={chipLabel}
                backgroundColor={chipLabelColor}
                containerStyle={{ borderWidth: 0 }}
                labelStyle={{ color: '#FFF', fontFamily: myFontWeight.semiBold }}
              />
              {startDate && (
                <MyText
                  text={startDate}
                  styleProps={{
                    color: myTextColor.caption
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Shadow>
  )
}

export default MyCourseCard
