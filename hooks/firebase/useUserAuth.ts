import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

import useFirebaseAuth from '../api/useFirebaseAuth'

import { useSession } from '@/contexts/AuthContext'
import { errorMessage } from '@/contracts/messages'
import { firebaseAuth } from '@/utils/firebase'

const useUserAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>()
  const [error, setError] = useState<string | null>(null)
  const { firebaseToken, saveFirebaseToken } = useSession()
  const { createCustomToken } = useFirebaseAuth()

  if (firebaseToken && !user) {
    firebaseAuth
      .signInWithCustomToken(firebaseToken)
      .then((result) => {
        setUser(result.user)
      })
      .catch((err) => {
        setError(errorMessage.ERM033)
        console.log(err)
      })
  }

  useEffect(() => {
    ;(async () => {
      if (!firebaseToken && !error) {
        const result = await createCustomToken()
        if (typeof result === 'string' || !result) {
          setError(result || errorMessage.ERM033)
        } else {
          saveFirebaseToken(result.token)
        }
      }
    })()
  }, [createCustomToken, error, firebaseToken, saveFirebaseToken])

  // useEffect(() => {
  //   if (firebaseToken) {
  //     const subscriber = firebaseAuth.onAuthStateChanged((user) => {
  //       if (!user) {
  //         removeFirebaseToken()
  //       }
  //       setUser(user)
  //     })
  //     return subscriber
  //   } // unsubscribe on unmount
  // }, [firebaseToken, removeFirebaseToken])

  return { user, error }
}

export default useUserAuth
