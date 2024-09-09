import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { myDeviceWidth, width } from '@/contracts/constants'

const RegisterScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, gap: 24 }}>
          <MyText
            text='Điền thông tin phía dưới để tham gia trải nghiệm các khóa học tuyệt vời của chúng tôi.'
            styleProps={{ fontSize: width < myDeviceWidth.sm ? 14 : 16, textAlign: 'left', marginTop: 24 }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen
