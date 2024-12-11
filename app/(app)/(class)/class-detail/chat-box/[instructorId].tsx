import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert } from 'react-native/Libraries/Alert/Alert'
import { LoaderScreen } from 'react-native-ui-lib'

import ChatBox from '@/components/chat-with-instructor/ChatBox'
import { myFontWeight, myTheme } from '@/contracts/constants'
import { errorMessage } from '@/contracts/messages'
import useUserAuth from '@/hooks/firebase/useUserAuth'

const ChatWithInstructorScreen = () => {
  const { user, error } = useUserAuth()
  console.log('user', user)

  if (error) {
    Alert.alert('Lỗi', errorMessage.ERM033)
    router.back()
  }

  const { instructorId, classId } = useLocalSearchParams()
  return (
    <>
      {!user ? (
        <LoaderScreen
          size='large'
          message='Đang tải...'
          color={myTheme.primary}
          messageStyle={{ fontFamily: myFontWeight.regular }}
        />
      ) : (
        <ChatBox
          classId={Array.isArray(classId) ? classId[0] : classId}
          instructorId={Array.isArray(instructorId) ? instructorId[0] : instructorId}
          learnerId={user.uid}
        />
      )}
    </>
  )
}

export default ChatWithInstructorScreen
