import Feather from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Carousel, Chip, View } from 'react-native-ui-lib'

import MyLink from '../MyLink'
import MyText from '../MyText'

import { height, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IClass } from '@/contracts/interfaces/course.interface'
import { extractSlot, extractWeekday } from '@/utils'

const ClassList = ({ classList }: { classList: IClass[] }) => {
  return (
    <>
      <Carousel
        style={{ flexGrow: 0 }}
        pageControlPosition='under'
        containerStyle={{ height: height / 4.75 }}
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
        {classList.map((value, i) => (
          <Shadow
            style={{
              gap: 7.5,
              height: height / 6,
              borderRadius: 16,
              padding: 12.5
            }}
            key={i}
          >
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <MyText
                text={value.title}
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
              <MyText
                text={`Ngày bắt đầu: ${dayjs(value.startDate).format('DD/MM/YYYY')}`}
                styleProps={{ color: myTextColor.caption }}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <Feather name='clock' size={20} color={myTheme.grey} />
              <MyText
                text={`Thời gian học: ${value.weekdays.map((value) => extractWeekday(value)).join(', ')} • Tiết ${value.slotNumbers}: ${extractSlot(value.slotNumbers[0]).slotStart} - ${extractSlot(value.slotNumbers[0]).slotEnd}`}
                styleProps={{ color: myTextColor.caption }}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Feather name='map-pin' size={20} color={myTheme.grey} />
              <MyLink
                href='/'
                text={value.garden.name}
                styleProps={{ color: myTextColor.caption, textDecorationLine: 'underline' }}
              />
            </View>
          </Shadow>
        ))}
      </Carousel>
    </>
  )
}

export default ClassList
