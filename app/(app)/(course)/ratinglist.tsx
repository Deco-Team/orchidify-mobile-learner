import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { ProgressBar, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import RatingFilterButton from '@/components/course-detail/RatingFilterButton'
import RatingList from '@/components/course-detail/RatingList'
import { myFontWeight, myTheme, width } from '@/contracts/constants'

const RatingListScreen = () => {
  const [filterStatus, setFilterStatus] = useState<string>('Tất cả')

  const handleFilterRating = (label: string) => {
    setFilterStatus(label)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF' }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
          style={{ paddingHorizontal: 15, flex: 1 }}
        >
          <View style={{ flexDirection: 'row', gap: 3, alignItems: 'baseline' }}>
            <MyText text='4.5' styleProps={{ fontFamily: myFontWeight.bold, fontSize: 50 }} />
            <MyText text='/5' styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18 }} />
          </View>
          <StarRatingDisplay starSize={50} color={myTheme.yellow} starStyle={{ marginHorizontal: 0 }} rating={3.5} />
          <MyText text='536 đánh giá' styleProps={{ fontSize: 18, marginVertical: 5 }} />
          <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <MyText text='5' styleProps={{ fontFamily: myFontWeight.bold }} />
              <StarRatingDisplay
                maxStars={1}
                starSize={20}
                color={myTheme.yellow}
                starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
                rating={1}
              />
              <ProgressBar
                style={{ backgroundColor: myTheme.lightGrey, width: (width * 9) / 12, marginRight: 4 }}
                progress={(123 / 536) * 100}
                progressColor={myTheme.primary}
              />
              <MyText text='123' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <MyText text='4' styleProps={{ fontFamily: myFontWeight.bold }} />
              <StarRatingDisplay
                maxStars={1}
                starSize={20}
                color={myTheme.yellow}
                starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
                rating={1}
              />
              <ProgressBar
                style={{ backgroundColor: myTheme.lightGrey, width: (width * 9) / 12, marginRight: 4 }}
                progress={(23 / 536) * 100}
                progressColor={myTheme.primary}
              />
              <MyText text='23' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <MyText text='3' styleProps={{ fontFamily: myFontWeight.bold }} />
              <StarRatingDisplay
                maxStars={1}
                starSize={20}
                color={myTheme.yellow}
                starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
                rating={1}
              />
              <ProgressBar
                style={{ backgroundColor: myTheme.lightGrey, width: (width * 9) / 12, marginRight: 4 }}
                progress={(10 / 536) * 100}
                progressColor={myTheme.primary}
              />
              <MyText text='10' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <MyText text='2' styleProps={{ fontFamily: myFontWeight.bold }} />
              <StarRatingDisplay
                maxStars={1}
                starSize={20}
                color={myTheme.yellow}
                starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
                rating={1}
              />
              <ProgressBar
                style={{ backgroundColor: myTheme.lightGrey, width: (width * 9) / 12, marginRight: 4 }}
                progress={(80 / 536) * 100}
                progressColor={myTheme.primary}
              />
              <MyText text='80' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <MyText text='1' styleProps={{ fontFamily: myFontWeight.bold }} />
              <StarRatingDisplay
                maxStars={1}
                starSize={20}
                color={myTheme.yellow}
                starStyle={{ marginHorizontal: 0, marginLeft: 4 }}
                rating={1}
              />
              <ProgressBar
                style={{ backgroundColor: myTheme.lightGrey, width: (width * 9) / 12, marginRight: 4 }}
                progress={(300 / 536) * 100}
                progressColor={myTheme.primary}
              />
              <MyText text='300' />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 15, gap: 7.5 }}>
            <RatingFilterButton
              onPress={() => handleFilterRating('Tất cả')}
              isSelected={filterStatus.includes('Tất cả')}
              text='Tất cả'
            />
            <RatingFilterButton
              onPress={() => handleFilterRating('5')}
              isSelected={filterStatus.includes('5')}
              text='5'
              star
            />
            <RatingFilterButton
              onPress={() => handleFilterRating('4')}
              isSelected={filterStatus.includes('4')}
              text='4'
              star
            />
            <RatingFilterButton
              onPress={() => handleFilterRating('3')}
              isSelected={filterStatus.includes('3')}
              text='3'
              star
            />
            <RatingFilterButton
              onPress={() => handleFilterRating('2')}
              isSelected={filterStatus.includes('2')}
              text='2'
              star
            />
            <RatingFilterButton
              onPress={() => handleFilterRating('1')}
              isSelected={filterStatus.includes('1')}
              text='1'
              star
            />
          </View>
          <RatingList />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RatingListScreen
