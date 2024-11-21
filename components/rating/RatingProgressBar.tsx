import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { ProgressBar, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTheme, width } from '@/contracts/constants'
interface RatingProgressBarProps {
  numberOfRating: number
  star: number
  totalRating: number
}
const RatingProgressBar: React.FC<RatingProgressBarProps> = ({ numberOfRating, star, totalRating }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
      <MyText text={star.toString()} styleProps={{ fontFamily: myFontWeight.bold, textAlign: 'center', width: 10 }} />
      <StarRatingDisplay
        maxStars={1}
        starSize={20}
        color={myTheme.yellow}
        starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
        rating={1}
      />
      <ProgressBar
        style={{ backgroundColor: myTheme.lightGrey, width: (width * 9) / 12, marginRight: 4 }}
        progress={(numberOfRating / totalRating) * 100}
        progressColor={myTheme.primary}
      />
      <MyText text={numberOfRating.toString()} />
    </View>
  )
}

export default RatingProgressBar
