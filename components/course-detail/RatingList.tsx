import dayjs from 'dayjs'
import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { Avatar, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IClassFeedbackListResponse, ICourseFeedbackListResponse } from '@/contracts/interfaces/feedback.interface'

interface RatingListProps {
  feedbackList: ICourseFeedbackListResponse[] | IClassFeedbackListResponse[]
}

const RatingList: React.FC<RatingListProps> = ({ feedbackList }) => {
  return (
    <View
      style={{ width: (width * 11) / 12, padding: 10, flexDirection: 'column', rowGap: 12.5, marginHorizontal: 15 }}
    >
      {feedbackList.map((value, i) => (
        <View
          key={i}
          style={{ alignSelf: 'flex-start', flexDirection: 'column', marginBottom: 10, gap: 10, width: '100%' }}
        >
          <View style={{ flexDirection: 'row', columnGap: 10 }}>
            <Avatar
              source={{
                uri: value.learner.avatar
              }}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 5
              }}
            >
              <MyText styleProps={{ fontFamily: myFontWeight.bold }} text={value.learner.name} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StarRatingDisplay
                  starSize={20}
                  color={myTheme.yellow}
                  starStyle={{ marginHorizontal: 0 }}
                  rating={value.rate}
                />
                <MyText styleProps={{ color: myTextColor.caption }} text='  •  ' />
                <MyText
                  styleProps={{ color: myTextColor.caption }}
                  text={dayjs(value.updatedAt).format('DD/MM/YYYY')}
                />
              </View>
            </View>
          </View>
          <MyText styleProps={{ color: myTextColor.caption, textAlign: 'justify' }} text={value.comment} />
        </View>
      ))}
    </View>
  )
}

export default RatingList
