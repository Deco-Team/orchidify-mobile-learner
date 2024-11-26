import { Feather } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, LayoutChangeEvent, Platform, ScrollView } from 'react-native'
import { Carousel, LoaderScreen, View } from 'react-native-ui-lib'

import MyLink from '@/components/common/MyLink'
import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IGardenDetail } from '@/contracts/interfaces/garden.interface'
import useGarden from '@/hooks/api/useGarden'

const defaultGardenDetail: IGardenDetail = {
  _id: '',
  name: '',
  description: '',
  addressLink: '',
  images: [],
  status: '',
  maxClass: 0,
  gardenManagerId: '',
  createdAt: '',
  updatedAt: '',
  gardenManager: {
    _id: '',
    name: ''
  }
}

const GardenDetailScreen = () => {
  const { gardenId } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IGardenDetail>(defaultGardenDetail)
  const { getGardenDetail } = useGarden()
  const [numberOfLinesGardenDescription, setNumberOfLinesGardenDescription] = useState(0)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const gardenDetail = await getGardenDetail(gardenId as string)
      if (gardenDetail && typeof gardenDetail !== 'string') {
        setData(gardenDetail)
      }
      setIsLoading(false)
    })()
  }, [gardenId, getGardenDetail])

  const handleGardenDescriptionLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const lineHeight = 18
    const calculatedLines = Math.round(height / lineHeight)
    setNumberOfLinesGardenDescription(calculatedLines)
  }

  return (
    <>
      {isLoading ? (
        <LoaderScreen
          size='large'
          message='Đang tải...'
          color={myTheme.primary}
          messageStyle={{ fontFamily: myFontWeight.regular }}
        />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: '#FFF' }}
          keyboardVerticalOffset={100}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
            <Carousel
              style={{ flexGrow: 0, marginTop: 15, marginBottom: data.images.length === 1 ? 15 : undefined }}
              autoplay
              autoplayInterval={3000}
              pageControlPosition={data.images.length === 1 ? undefined : 'under'}
              containerMarginHorizontal={2.5}
              pageControlProps={{
                color: myTheme.primary
              }}
              pageWidth={data.images.length === 1 ? (width * 19) / 20 : (width * 4.5) / 6}
            >
              {data.images.map((value, i) => (
                <Image key={i} source={value} style={{ aspectRatio: '16/9', borderRadius: 16 }} />
              ))}
            </Carousel>
            <View style={{ paddingHorizontal: 15, alignSelf: 'flex-start', gap: 10 }}>
              <MyText text='Tên nhà vườn' weight={myFontWeight.bold} styleProps={{ fontSize: 20 }} />
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Feather name='map-pin' size={20} color={myTheme.grey} />
                <MyLink
                  href={{ pathname: data.addressLink as any }}
                  text={data.name}
                  styleProps={{ color: myTextColor.caption, textDecorationLine: 'underline' }}
                />
              </View>
              <View style={{ gap: 5 }}>
                <MyText text='Về nhà vườn' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
                <MyText
                  ellipsizeMode='tail'
                  onLayout={handleGardenDescriptionLayout}
                  numberOfLines={numberOfLinesGardenDescription}
                  styleProps={{
                    textAlign: 'justify',
                    color: myTextColor.caption
                  }}
                  text={data.description}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default GardenDetailScreen
