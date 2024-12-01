import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
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
  rate: number
  comment: string
  handleSubmitFeedback: () => Promise<void>
  setRate: React.Dispatch<React.SetStateAction<number>>
  setComment: React.Dispatch<React.SetStateAction<string>>
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  setFeedbackModalVisible,
  feedbackModalVisible,
  data,
  comment,
  handleSubmitFeedback,
  rate,
  setComment,
  setRate
}) => {
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
        <Image
          source={data.thumbnail.replace('http://', 'https://')}
          style={{ aspectRatio: '16/9', borderRadius: 16 }}
        />
        <MyText
          text={data.title}
          styleProps={{ fontSize: 20, fontFamily: myFontWeight.semiBold, textAlign: 'center' }}
        />
        <MyText
          text={data.instructor.name}
          styleProps={{ fontSize: 16, color: myTextColor.caption, textAlign: 'center' }}
        />
        <MyText text='Đánh giá sao' styleProps={{ fontSize: 14, textAlign: 'center' }} />
        <StarRating
          enableHalfStar={false}
          starSize={50}
          color={myTheme.yellow}
          starStyle={{ marginHorizontal: 0 }}
          rating={rate}
          onChange={setRate}
          style={{ alignSelf: 'center' }}
        />
        <TextField
          multiline
          value={comment}
          onChangeText={setComment}
          showCharCounter
          textAlignVertical='top'
          charCounterStyle={{ fontFamily: myFontWeight.regular }}
          numberOfLines={6}
          maxLength={500}
          containerStyle={{ alignItems: 'flex-start' }}
          style={{
            borderStyle: 'solid',
            borderColor: myTheme.primary,
            borderWidth: 1,
            borderRadius: 7,
            paddingHorizontal: 8,
            paddingTop: 8,
            fontSize: 14,
            fontFamily: myFontWeight.regular
          }}
        />
        <MyText
          text='Nhận xét này sẽ ẩn danh với giảng viên'
          styleProps={{ color: myTextColor.caption, fontSize: 14 }}
        />
        <Button
          disabled={rate === 0 || !comment}
          backgroundColor={myTheme.primary}
          labelStyle={{ fontFamily: myFontWeight.semiBold, fontSize: 16 }}
          label='Gửi'
          onPress={handleSubmitFeedback}
        />
      </View>
    </Modal>
  )
}

export default FeedbackModal
