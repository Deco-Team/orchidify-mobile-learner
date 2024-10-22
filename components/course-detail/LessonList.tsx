import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Badge, View } from 'react-native-ui-lib'

import MyText from '../MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

const LessonList = () => {
  return (
    <View style={{ width: (width * 11) / 12, padding: 10, flexDirection: 'column', rowGap: 12.5 }}>
      <Shadow>
        <View
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
            label='01'
            size={35}
            borderRadius={999}
          />
          <MyText text='Lesson 1' weight={myFontWeight.semiBold} styleProps={{ fontSize: 14 }} />
        </View>
      </Shadow>
    </View>
  )
}

export default LessonList
