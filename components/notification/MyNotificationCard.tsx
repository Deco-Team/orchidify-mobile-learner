import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import MyText from '../common/MyText'

import { myFontWeight, myTextColor, width } from '@/contracts/constants'

interface IMyNotificationCard {
  title: string
  body: string
  date: string
  link: {
    id: string
    type: string
  }
}

const MyNotificationCard: React.FC<IMyNotificationCard> = ({ body, title, date, link }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/(app)/(${link.type.toLowerCase()})/${link.type.toLowerCase()}-detail/[${link.type.toLowerCase()}Id]`,
          params: {
            [`${link.type.toLowerCase()}Id`]: link.id
          }
        })
      }
      style={{ width: (width * 10.5) / 12, gap: 5, marginVertical: 10 }}
    >
      <MyText styleProps={{ fontSize: 16, fontFamily: myFontWeight.bold }} text={title} />
      <MyText styleProps={{ fontSize: 14 }} text={body} />
      <MyText styleProps={{ fontSize: 12, color: myTextColor.caption }} text={date} />
    </TouchableOpacity>
  )
}

export default MyNotificationCard
