import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Badge, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

const SessionList = ({
  sessionList,
  onPressHandleEvent,
  classId
}: {
  sessionList: {
    _id: string
    title: string
  }[]
  onPressHandleEvent?: boolean
  classId?: string
}) => {
  const router = useRouter()

  return (
    <View style={{ width: (width * 11) / 12, padding: 10, flexDirection: 'column', rowGap: 12.5 }}>
      {sessionList.map((value, i) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(app)/(class)/session-detail/[sessionId]',
              params: {
                sessionId: value._id,
                classId
              }
            })
          }
          disabled={!onPressHandleEvent}
          key={i}
        >
          <Shadow
            style={{
              width: '100%',
              borderRadius: 16,
              paddingHorizontal: 15,
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
              paddingVertical: 15
            }}
          >
            <Badge
              labelStyle={{ color: myTextColor.primary, fontSize: 14, fontFamily: myFontWeight.semiBold, margin: 0 }}
              backgroundColor={myTheme.lightPrimary}
              label={(i + 1).toString()}
              size={35}
              borderRadius={999}
            />
            <MyText text={value.title} weight={myFontWeight.semiBold} styleProps={{ fontSize: 14 }} />
          </Shadow>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SessionList
