import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { Carousel, Chip } from 'react-native-ui-lib'

import MyText from '../MyText'

import { myTheme, width, myFontWeight, myTextColor } from '@/contracts/constants'

const Overview = () => {
  const mockImage = [
    'https://picsum.photos/200',
    'https://picsum.photos/100',
    'https://picsum.photos/300',
    'https://picsum.photos/400'
  ]

  return (
    <>
      <Carousel
        style={{ flexGrow: 0 }}
        autoplay
        autoplayInterval={3000}
        pageControlPosition='under'
        containerMarginHorizontal={-15}
        pageControlProps={{
          color: myTheme.primary
        }}
        pageWidth={(width * 4.5) / 6}
      >
        {mockImage.map((value) => (
          <Image source={value} style={{ aspectRatio: '16/9', borderRadius: 16 }} />
        ))}
      </Carousel>
      <MyText
        ellipsizeMode='tail'
        numberOfLines={1}
        text='Trồng cây'
        styleProps={{ fontFamily: myFontWeight.bold, fontSize: 20, alignSelf: 'flex-start', marginBottom: 10 }}
      />
      <View style={{ marginBottom: 15, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Chip
          label='Thể loại 1'
          backgroundColor={myTheme.lighter}
          containerStyle={{ borderWidth: 0 }}
          labelStyle={{ color: myTextColor.primary, fontFamily: myFontWeight.bold }}
        />
        <Chip
          label='Thể loại 1'
          backgroundColor={myTheme.lighter}
          containerStyle={{ borderWidth: 0 }}
          labelStyle={{ color: myTextColor.primary, fontFamily: myFontWeight.bold }}
        />
        <Chip
          label='Thể loại 1'
          backgroundColor={myTheme.lighter}
          containerStyle={{ borderWidth: 0 }}
          labelStyle={{ color: myTextColor.primary, fontFamily: myFontWeight.bold }}
        />
      </View>
      <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
        <MyText text='4.8' styleProps={{ fontFamily: myFontWeight.bold, marginRight: 5 }} />
        <StarRatingDisplay starSize={20} color={myTheme.yellow} starStyle={{ marginHorizontal: 0 }} rating={3.5} />
        <MyText text='(445)' styleProps={{ marginRight: 5, color: myTextColor.caption }} />
      </View>
      <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
        <MyText text='Tạo bởi' styleProps={{ fontSize: 14, marginRight: 5 }} />
        <MyText
          text='PhongNH'
          styleProps={{ fontSize: 14, fontFamily: myFontWeight.bold, color: myTextColor.primary }}
        />
      </View>
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
          flexWrap: 'wrap',
          rowGap: 15,
          columnGap: 20,
          marginBottom: 0
        }}
      >
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Feather name='check' size={22} color={myTheme.grey} />
          <MyText text='Cơ bản' styleProps={{ color: myTextColor.caption }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Feather name='users' size={20} color={myTheme.grey} />
          <MyText text='30 Học viên' styleProps={{ color: myTextColor.caption }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Feather name='file-text' size={20} color={myTheme.grey} />
          <MyText text='20 buổi học' styleProps={{ color: myTextColor.caption }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <MaterialIcons name='class' size={22} color={myTheme.grey} />
          <MyText text='2 lớp học' styleProps={{ color: myTextColor.caption }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Feather name='play-circle' size={20} color={myTheme.grey} />
          <MyText text='10 tuần' styleProps={{ color: myTextColor.caption }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <MaterialCommunityIcons name='certificate-outline' size={22} color={myTheme.grey} />
          <MyText text='Có chứng chỉ' styleProps={{ color: myTextColor.caption }} />
        </View>
      </View>
    </>
  )
}

export default Overview
