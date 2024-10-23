import React from 'react'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'

import MyText from '../MyText'

import { myFontWeight, myTextColor, myTheme } from '@/contracts/constants'

const RatingFilterButton = ({
  star = false,
  text,
  isSelected,
  onPress
}: {
  star?: boolean
  text: string
  isSelected: boolean
  onPress: ((event: GestureResponderEvent) => void) | undefined
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderRadius: 99,
        borderColor: myTheme.primary,
        borderWidth: 1,
        paddingVertical: 2.5,
        paddingHorizontal: 10,
        backgroundColor: isSelected ? myTheme.primary : undefined
      }}
    >
      <MyText
        text={text}
        styleProps={{ fontFamily: myFontWeight.bold, color: isSelected ? '#FFF' : myTextColor.primary }}
      />
      {star && (
        <StarRatingDisplay
          maxStars={1}
          starSize={20}
          color={myTheme.yellow}
          starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
          rating={1}
        />
      )}
    </TouchableOpacity>
  )
}

export default RatingFilterButton
