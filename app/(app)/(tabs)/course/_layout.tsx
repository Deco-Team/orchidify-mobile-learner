import Feather from '@expo/vector-icons/Feather'
import { Slot, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Button, TextField, View } from 'react-native-ui-lib'

import { height, myDeviceHeight, myFontWeight, myTheme } from '@/contracts/constants'
import { useStore } from '@/hooks/store/useStore'

const CourseLayout = () => {
  const [isIndex, setIsIndex] = useState(true)
  const router = useRouter()

  const filterState = useStore((filter) => filter.filterState)
  const setFilterState = useStore((value) => value.setFilterState)

  const handlePresentModalPress = () => {
    setFilterState(filterState === -1 ? 1 : -1)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#FFF' }}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={{ justifyContent: 'center' }}
            style={{ paddingHorizontal: 10, backgroundColor: '#FFF' }}
          >
            <TextField
              inputMode='text'
              leadingAccessory={
                <Feather
                  style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 25 }}
                  name='search'
                  size={24}
                  color='grey'
                />
              }
              trailingAccessory={
                <TouchableOpacity
                  style={{
                    padding: 10,
                    position: 'absolute',
                    top: height < myDeviceHeight.sm ? 26 : 33,
                    right: 20
                  }}
                  onPress={handlePresentModalPress}
                >
                  <Feather name='filter' size={24} color='gray' />
                </TouchableOpacity>
              }
              placeholder='Tìm kiếm'
              placeholderTextColor='grey'
              fieldStyle={{
                paddingVertical: 20
              }}
              style={{
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 7,
                borderColor: 'lightgrey',
                height: height < myDeviceHeight.sm ? 60 : 70,
                paddingLeft: 55,
                paddingRight: 15,
                fontSize: 16,
                overflow: 'hidden',
                fontFamily: myFontWeight.regular,
                marginHorizontal: 10,
                marginBottom: 20
              }}
            />
            <View style={{ flex: 1 }}>
              <Slot />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  )
}

export default CourseLayout
