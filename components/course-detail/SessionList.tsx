import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Badge, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { CLASS_STATUS, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

const SessionList = ({
  sessionList,
  onPressHandleEvent,
  classId,
  classStatus
}: {
  sessionList: {
    _id: string
    title: string
  }[]
  onPressHandleEvent?: boolean
  classId?: string
  classStatus?: CLASS_STATUS
}) => {
  const router = useRouter()
  return (
    <View style={{ width: (width * 11) / 12, padding: 10, flexDirection: 'column', rowGap: 12.5 }}>
      {sessionList.map((value, i) => (
        <View backgroundColor='white' style={{ elevation: 5, borderRadius: 16 }}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(app)/(class)/session-detail/[sessionId]',
                params: {
                  sessionId: value._id,
                  classId,
                  classStatus
                }
              })
            }
            style={{
              width: (width * 10) / 12,
              paddingHorizontal: 15,
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
              paddingVertical: 15
            }}
            disabled={!onPressHandleEvent}
            key={i}
          >
            <Badge
              labelStyle={{ color: myTextColor.primary, fontSize: 14, fontFamily: myFontWeight.semiBold, margin: 0 }}
              backgroundColor={myTheme.lightPrimary}
              label={(i + 1).toString()}
              size={35}
              borderRadius={999}
            />
            <MyText
              text={value.title}
              ellipsizeMode='tail'
              numberOfLines={1}
              weight={myFontWeight.semiBold}
              styleProps={{ fontSize: 14, width: '85%' }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default SessionList
