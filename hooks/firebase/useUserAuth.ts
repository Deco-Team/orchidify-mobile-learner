import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

import { firebaseAuth } from '@/utils/firebase'

const useUserAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>()

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return subscriber // unsubscribe on unmount
  }, [])

  return { user }
}

export default useUserAuth
