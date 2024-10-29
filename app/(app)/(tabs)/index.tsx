import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#FFF' }}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  )
}
