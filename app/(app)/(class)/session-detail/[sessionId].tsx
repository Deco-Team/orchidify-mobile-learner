import Feather from '@expo/vector-icons/Feather'
import { HeaderBackButton } from '@react-navigation/elements'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Badge, Carousel, LoaderScreen, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { ISession } from '@/contracts/interfaces/class.interface'
import useClass from '@/hooks/api/useClass'
const defaultSessionDetail: ISession = {
  _id: '',
  assignments: [],
  description: '',
  media: [],
  sessionNumber: 0,
  title: ''
}

const SessionDetailScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { getSessionDetail } = useClass()
  const { sessionId, classId } = useLocalSearchParams()
  const [data, setData] = useState<ISession>(defaultSessionDetail)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const sessionDetail = await getSessionDetail(sessionId as string, classId as string)
      if (sessionDetail && typeof sessionDetail !== 'string') {
        setData(sessionDetail)
      }
      setIsLoading(false)
    })()
  }, [sessionId, getSessionDetail, classId])

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
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
              position: 'relative'
            }}
          >
            <HeaderBackButton
              label='Quay lại'
              style={{ position: 'absolute', top: 10, left: 0, zIndex: 99 }}
              labelStyle={{
                fontFamily: myFontWeight.regular
              }}
              onPress={() => router.back()}
            />
            <Carousel
              style={{
                flexGrow: 0
              }}
              itemSpacings={0}
              pageControlPosition='under'
              pageControlProps={{
                color: myTheme.primary,
                size: 8
              }}
              pageWidth={width}
            >
              {data.media.map((value, i) => (
                <Image key={i} source={value.url} style={{ aspectRatio: '16/9' }} />
              ))}
            </Carousel>
            <View style={{ paddingHorizontal: 15, alignSelf: 'flex-start', gap: 10 }}>
              <MyText text={data.title} weight={myFontWeight.bold} styleProps={{ fontSize: 20 }} />
              <MyText
                text={`${data.sessionNumber} - ${data.title}`}
                weight={myFontWeight.bold}
                styleProps={{ fontSize: 16 }}
              />
              <MyText text={data.description} styleProps={{ marginBottom: 7.5, color: myTextColor.caption }} />
              {data.assignments.map((value, i) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/(app)/(class)/assignment-detail/[assignmentId]',
                      params: {
                        assignmentId: value._id,
                        classId,
                        sessionNumber: data.sessionNumber,
                        sessionTitle: data.title
                      }
                    })
                  }
                  key={i}
                >
                  <Shadow
                    style={{
                      width: (width * 11) / 12,
                      borderRadius: 16,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      columnGap: 10,
                      alignItems: 'center',
                      paddingVertical: 15
                    }}
                  >
                    <Badge
                      customElement={<Feather name='file-text' size={20} color={myTheme.primary} />}
                      backgroundColor={myTheme.lightPrimary}
                      size={35}
                      borderRadius={999}
                    />
                    <MyText text={value.title} weight={myFontWeight.semiBold} styleProps={{ fontSize: 14 }} />
                  </Shadow>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default SessionDetailScreen
