import { Image } from 'expo-image'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Chip, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

interface IMyCheckoutCard {
  title: string
  instructor: string
  price: string
  publishStatus?: boolean
  image: string
}

const MyCheckoutCard = (props: IMyCheckoutCard) => {
  const { title, instructor, price, image, publishStatus = false } = props
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
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 25,
            paddingRight: 12.5
          }}
        >
          <MyText
            text={price}
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
    </Shadow>
  )
}

export default MyCheckoutCard
