import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { LoaderScreen } from 'react-native-ui-lib'

import ChatBox from '@/components/chat-with-instructor/ChatBox'
import { myFontWeight, myTheme } from '@/contracts/constants'
import useFirebaseAuth from '@/hooks/api/useFirebaseAuth'
import useUserAuth from '@/hooks/firebase/useUserAuth'
import { firebaseAuth } from '@/utils/firebase'

const ChatWithInstructorScreen = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { createCustomToken } = useFirebaseAuth()

  const { user } = useUserAuth()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const data = await createCustomToken()
      if (data) {
        try {
          await firebaseAuth.signInWithCustomToken(data.token)
        } catch (error) {
          console.log('error', error)
        }
      }
      setIsLoading(false)
    })()
  }, [createCustomToken])

  const { instructorId, classId } = useLocalSearchParams()

  return (
    <>
      {isLoading && !user ? (
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
          learnerId={user?.uid || ''}
        />
      )}
    </>
  )
}

export default ChatWithInstructorScreen
