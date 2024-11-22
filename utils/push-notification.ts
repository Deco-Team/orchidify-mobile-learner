import { getToken } from '@react-native-firebase/messaging'
import { PermissionsAndroid } from 'react-native'

import { firebaseCloudMessaging } from './firebase'

const checkAndRequestNotificationPermission = async () => {
  if (PermissionsAndroid.RESULTS.POST_NOTIFICATIONS === 'granted') {
    // Check whether notification permissions have already been granted;
    return true
  } else if (
    PermissionsAndroid.RESULTS.POST_NOTIFICATIONS === 'denied' ||
    PermissionsAndroid.RESULTS.POST_NOTIFICATIONS === 'never_ask_again'
  ) {
    // If the user has denied notification permissions, or if the user has denied the permission and selected the "Don't ask again" option
    return false
  } else {
    try {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        return true
      }
    } catch (error) {
      console.error('An error occurred while requesting permission:', error)
    }
  }

  return false
}

export const getRegistrationToken = async () => {
  if (!(await checkAndRequestNotificationPermission())) return null

  try {
    const currentToken = await getToken(firebaseCloudMessaging, {
      vapidKey: process.env.FIREBASE_VAPID_KEY
    })

    return currentToken ? currentToken : null
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err)
    // ...
    return null
  }
}
