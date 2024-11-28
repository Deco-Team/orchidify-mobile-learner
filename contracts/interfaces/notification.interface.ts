import { Timestamp } from '@react-native-firebase/firestore'

export interface INotification {
  id: string
  body: string
  data: {
    id: string
    type: string
  }
  receiverIds: string[]
  title: string
  createdAt: Timestamp
}
