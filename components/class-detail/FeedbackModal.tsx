import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import StarRating from 'react-native-star-rating-widget'
import { Button, TextField, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTextColor, myTheme } from '@/contracts/constants'
import { IClassDetail } from '@/contracts/interfaces/class.interface'

interface FeedbackModalProps {
  setFeedbackModalVisible: (feedbackModalVisible: boolean) => void
  feedbackModalVisible: boolean
  data: IClassDetail
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ setFeedbackModalVisible, feedbackModalVisible, data }) => {
  const [rating, setRating] = useState(0)

  return (
    <Modal avoidKeyboard isVisible={feedbackModalVisible}>
      <View style={{ backgroundColor: '#FFF', borderRadius: 16, padding: 12, gap: 6, position: 'relative' }}>
        <TouchableOpacity
          onPress={() => setFeedbackModalVisible(false)}
          style={{
            position: 'absolute',
            right: -7.5,
            top: -7.5,
            zIndex: 9,
            backgroundColor: 'black',
            borderRadius: 999
          }}
        >
          <AntDesign name='closecircle' size={22} color={myTheme.primary} />
        </TouchableOpacity>
        <Image source={data.thumbnail} style={{ aspectRatio: '16/9', borderRadius: 16 }} />
        <MyText
          text={data.title}
          styleProps={{ fontSize: 20, fontFamily: myFontWeight.semiBold, textAlign: 'center' }}
        />
        <MyText text={data.title} styleProps={{ fontSize: 16, color: myTextColor.caption, textAlign: 'center' }} />
        <MyText text='Đánh giá sao' styleProps={{ fontSize: 14, textAlign: 'center' }} />
        <StarRating
          starSize={50}
          color={myTheme.yellow}
          starStyle={{ marginHorizontal: 0 }}
          rating={rating}
          onChange={setRating}
          style={{ alignSelf: 'center' }}
        />
        <TextField
          multiline
          showCharCounter
          charCounterStyle={{ fontFamily: myFontWeight.regular }}
          numberOfLines={6}
          maxLength={500}
          style={{
            borderStyle: 'solid',
            borderColor: '#ff0000',
            borderWidth: 1,
            borderRadius: 16,
            paddingHorizontal: 8,
            fontSize: 14,
            fontFamily: myFontWeight.regular
          }}
        />
        <MyText
          text='Nhận xét này sẽ ẩn danh với giảng viên'
          styleProps={{ color: myTextColor.caption, fontSize: 14 }}
        />
        <Button
          backgroundColor={myTheme.primary}
          labelStyle={{ fontFamily: myFontWeight.semiBold, fontSize: 16 }}
          label='Gửi'
          onPress={() => setFeedbackModalVisible(false)}
        />
      </View>
    </Modal>
  )
}

export default FeedbackModal
