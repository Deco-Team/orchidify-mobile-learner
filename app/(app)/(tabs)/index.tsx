import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LoaderScreen } from 'react-native-ui-lib'

import { myFontWeight, myTheme } from '@/contracts/constants'

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: '#FFF' }}
          keyboardVerticalOffset={100}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {isLoading ? (
              <LoaderScreen
                size='large'
                message='Đang tải...'
                color={myTheme.primary}
                messageStyle={{ fontFamily: myFontWeight.regular }}
              />
            ) : (
              <></>
            )}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </>
  )
}
