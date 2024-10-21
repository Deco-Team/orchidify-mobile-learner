import _ from 'lodash'
import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { Avatar, View } from 'react-native-ui-lib'

import MyText from '../MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

const RatingList = () => {
  return (
    <View style={{ width: (width * 11) / 12, padding: 10, flexDirection: 'column', rowGap: 12.5 }}>
      {_.times(5, (value) => (
        <View style={{ alignSelf: 'flex-start', flexDirection: 'column', marginBottom: 10, gap: 10 }}>
          <View style={{ flexDirection: 'row', columnGap: 10 }}>
            <Avatar
              source={{
                uri: 'https://picsum.photos/200'
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
              <MyText styleProps={{ fontFamily: myFontWeight.bold }} text='PhongNH' />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StarRatingDisplay
                  starSize={20}
                  color={myTheme.yellow}
                  starStyle={{ marginHorizontal: 0 }}
                  rating={3.5}
                />
                <MyText styleProps={{ color: myTextColor.caption }} text='  •  ' />
                <MyText styleProps={{ color: myTextColor.caption }} text='12 Feb 2022' />
              </View>
            </View>
          </View>
          <MyText
            styleProps={{ color: myTextColor.caption }}
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio totam quidem voluptatum non sequi sit culpa ducimus! Necessitatibus ipsum, dolorem numquam tenetur tempora, aperiam est, dolor commodi dignissimos fugit laborum.'
          />
        </View>
      ))}
    </View>
  )
}

export default RatingList
