import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Video, ResizeMode } from 'expo-av'
import { Image } from 'expo-image'
import React, { useRef } from 'react'
import { View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { Carousel, Chip } from 'react-native-ui-lib'

import MyText from './MyText'

import { myTheme, width, myFontWeight, myTextColor, LEVEL } from '@/contracts/constants'
import { IMedia } from '@/contracts/interfaces/index.interface'
import { extractLevel } from '@/utils'

const Overview = ({
  title,
  courseTypes,
  instructorName,
  learnerLimit,
  level,
  duration,
  sessionCount,
  classCount,
  media,
  rate
}: {
  title: string
  courseTypes: string[]
  instructorName: string
  learnerLimit: number
  level: LEVEL
  duration: number
  sessionCount: number
  classCount?: number
  media: IMedia[]
  rate?: {
    totalSum: number
    totalCount: number
    totalCountByRate: {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
    }
  }
}) => {
  const video = useRef<any>(null)

  return (
    <>
      <Carousel
        style={{ flexGrow: 0, marginTop: 15, marginBottom: media.length === 1 ? 15 : undefined }}
        pageControlPosition={media.length === 1 ? undefined : 'under'}
        containerMarginHorizontal={2.5}
        pageControlProps={{
          color: myTheme.primary
        }}
        pageWidth={media.length === 1 ? (width * 19) / 20 : (width * 4.5) / 6}
      >
        {media.map((value, i) => {
          switch (value.resource_type) {
            case 'image':
              return (
                <Image
                  key={i}
                  source={value.url.replace('http://', 'https://')}
                  style={{ aspectRatio: '16/9', borderRadius: 16 }}
                />
              )
            case 'video':
              return (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderRadius: 16,
                    aspectRatio: '16/9'
                  }}
                >
                  <Video
                    ref={video}
                    style={{
                      alignSelf: 'center',
                      width: '100%',
                      borderRadius: 16,
                      height: '100%'
                    }}
                    source={{
                      uri: value.url.replace('http://', 'https://')
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                  />
                </View>
              )
          }
        })}
      </Carousel>
      <View style={{ paddingHorizontal: 15 }}>
        <MyText
          text={title}
          styleProps={{ fontFamily: myFontWeight.bold, fontSize: 20, alignSelf: 'flex-start', marginBottom: 10 }}
        />
        <View
          style={{ marginBottom: 15, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 10 }}
        >
          {courseTypes.map((value, i) => (
            <Chip
              key={i}
              label={value}
              backgroundColor={myTheme.lighter}
              containerStyle={{ borderWidth: 0 }}
              labelStyle={{ color: myTextColor.primary, fontFamily: myFontWeight.bold }}
            />
          ))}
        </View>
        {!rate ? undefined : (
          <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <MyText
              text={rate.totalSum.toLocaleString()}
              styleProps={{ fontFamily: myFontWeight.bold, marginRight: 5 }}
            />
            <StarRatingDisplay
              starSize={20}
              color={myTheme.yellow}
              starStyle={{ marginHorizontal: 0 }}
              rating={rate.totalSum}
            />
            <MyText text={`(${rate.totalCount})`} styleProps={{ marginRight: 5, color: myTextColor.caption }} />
          </View>
        )}
        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <MyText text='Tạo bởi' styleProps={{ fontSize: 14, marginRight: 5 }} />
          <MyText
            text={instructorName}
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
            <MyText text={`${extractLevel(level).title}`} styleProps={{ color: myTextColor.caption }} />
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Feather name='users' size={20} color={myTheme.grey} />
            <MyText text={`${learnerLimit} học viên`} styleProps={{ color: myTextColor.caption }} />
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Feather name='file-text' size={20} color={myTheme.grey} />
            <MyText text={`${sessionCount} buổi học`} styleProps={{ color: myTextColor.caption }} />
          </View>
          {classCount ? (
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <MaterialIcons name='class' size={22} color={myTheme.grey} />
              <MyText text={`${classCount} lớp học`} styleProps={{ color: myTextColor.caption }} />
            </View>
          ) : null}
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Feather name='play-circle' size={20} color={myTheme.grey} />
            <MyText text={`${duration} tuần`} styleProps={{ color: myTextColor.caption }} />
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <MaterialCommunityIcons name='certificate-outline' size={22} color={myTheme.grey} />
            <MyText text='Có chứng chỉ' styleProps={{ color: myTextColor.caption }} />
          </View>
        </View>
      </View>
    </>
  )
}

export default Overview
