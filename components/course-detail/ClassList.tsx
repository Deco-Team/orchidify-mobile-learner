import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Carousel, Chip, View } from 'react-native-ui-lib'

import MyLink from '../MyLink'
import MyText from '../MyText'

import { height, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

const ClassList = () => {
  return (
    <>
      <Carousel
        style={{ flexGrow: 0 }}
        pageControlPosition='under'
        containerPaddingVertical={10}
        containerMarginHorizontal={-5}
        pageControlProps={{
          color: myTheme.primary,
          containerStyle: {
            marginVertical: 4
          }
        }}
        pageWidth={(width * 4.5) / 6}
      >
        <Shadow>
          <View
            style={{
              gap: 7.5,
              padding: 12.5,
              height: height / 6.5,
              borderRadius: 16
            }}
          >
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <MyText
                text='OCP-124'
                styleProps={{
                  fontFamily: myFontWeight.bold,
                  fontSize: 16,
                  alignSelf: 'flex-start'
                }}
              />
              <Chip
                label='Sắp bắt đầu'
                backgroundColor={myTheme.yellow}
                containerStyle={{ borderWidth: 0 }}
                labelStyle={{ color: '#FFF', fontFamily: myFontWeight.bold, fontSize: 10 }}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Feather name='calendar' size={20} color={myTheme.grey} />
              <MyText text='Ngày bắt đầu: 2/2/2002' styleProps={{ color: myTextColor.caption }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Feather name='clock' size={20} color={myTheme.grey} />
              <MyText text='Thời gian học: T2, T5 • Tiết 1: 7h - 9h30' styleProps={{ color: myTextColor.caption }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Feather name='map-pin' size={20} color={myTheme.grey} />
              <MyLink
                href='/'
                text='Tên nhà vườn 1'
                styleProps={{ color: myTextColor.caption, textDecorationLine: 'underline' }}
              />
            </View>
          </View>
        </Shadow>
      </Carousel>
    </>
  )
}

export default ClassList
