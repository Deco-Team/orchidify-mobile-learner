import { Image } from 'expo-image'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, width } from '@/contracts/constants'

interface IMyCheckoutCard {
  title: string
  instructor: string
  price: string
  image: string
  discount: number
  finalPrice: number
}

const MyCheckoutCard = (props: IMyCheckoutCard) => {
  const { title, instructor, price, image, discount, finalPrice } = props
  return (
    <Shadow
      style={{ width: (width * 11) / 12, minHeight: 125, borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}
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
            alignItems: 'baseline',
            maxHeight: 25,
            paddingRight: 12.5,
            gap: 5
          }}
        >
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
              text={`${price.toLocaleString()}`}
              styleProps={{
                textDecorationLine: 'line-through',
                color: myTextColor.caption,
                fontSize: 12
              }}
            />
          ) : undefined}
        </View>
      </View>
    </Shadow>
  )
}

export default MyCheckoutCard
