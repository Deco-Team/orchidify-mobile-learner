import { useRouter } from 'expo-router'
import React from 'react'
import { ImageBackground } from 'react-native'
import { Button, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { CLASS_STATUS, myFontWeight } from '@/contracts/constants'

interface IClassCard {
  title: string
  instructorName: string
  id: string
  status: CLASS_STATUS
  classCode: string
  progress: {
    total: number
    completed: number
    percentage: number
  }
}
const MyClassCard: React.FC<IClassCard> = ({ classCode, status, instructorName, title, id, progress }) => {
  const router = useRouter()
  return (
    <ImageBackground
      borderRadius={16}
      style={{
        minHeight: 125,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
      }}
      source={require('@/assets/images/class-card.png')}
    >
      <View style={{ gap: 4, width: '65%' }}>
        <MyText
          styleProps={{ color: 'white', fontSize: 12 }}
          text={`Đang diễn ra • ${progress.completed}/${progress.total}`}
        />
        <MyText
          styleProps={{ color: 'white', fontSize: 16, fontFamily: myFontWeight.semiBold }}
          ellipsizeMode='tail'
          numberOfLines={1}
          text={title}
        />
        <MyText styleProps={{ color: 'white', fontSize: 14 }} text={`bởi ${instructorName}`} />
      </View>
      <Button
        backgroundColor='#0046a9'
        size='xSmall'
        labelStyle={{ fontFamily: myFontWeight.regular, margin: 2.5 }}
        onPress={() =>
          router.push({
            pathname: '/(app)/(class)/class-detail/[classId]',
            params: {
              classId: id,
              title: classCode
            }
          })
        }
        label='Tiếp tục'
      />
    </ImageBackground>
  )
}

export default MyClassCard
