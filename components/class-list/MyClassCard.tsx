import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Shadow } from 'react-native-shadow-2'
import { View } from 'react-native-ui-lib'

import MyText from '../MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

interface IClassCard {
  title: string
  instructorName: string
  classCode: string
  id: string
  image: string
  progress: {
    total: number
    completed: number
    percentage: number
  }
}

const MyClassCard: React.FC<IClassCard> = ({ classCode, instructorName, title, id, image, progress }) => {
  const router = useRouter()
  return (
    <Shadow style={{ width: (width * 11) / 12 }}>
      <TouchableOpacity
        style={{
          minHeight: 125,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() =>
          router.push({
            pathname: '/(app)/(class)/class-detail/[classId]',
            params: {
              classId: id,
              title: classCode
            }
          })
        }
      >
        <Image source={image} style={{ width: 100, height: 100, borderRadius: 16, margin: 12.5, marginRight: 7.5 }} />
        <View style={{ flex: 1 }}>
          <MyText
            ellipsizeMode='tail'
            numberOfLines={1}
            text={title}
            styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, paddingRight: 12.5 }}
          />
          <MyText text={instructorName} styleProps={{ color: myTextColor.caption, fontSize: 15 }} />
          <View
            style={{
              flex: 1,
              marginTop: 20,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxHeight: 25,
              paddingRight: 12.5
            }}
          >
            <MyText text={classCode} styleProps={{ color: myTextColor.caption, fontSize: 15 }} />
            <View style={{ alignItems: 'center', gap: 10, flexDirection: 'row' }}>
              {/* <Chip
                label='Sắp bắt đầu'
                backgroundColor={myTheme.yellow}
                containerStyle={{ borderWidth: 0 }}
                labelStyle={{ color: '#FFF', fontFamily: myFontWeight.semiBold }}
              /> */}
              <MyText
                text={`${progress.completed}/${progress.total}`}
                weight={myFontWeight.semiBold}
                styleProps={{ color: myTextColor.primary, fontSize: 15 }}
              />
              <AnimatedCircularProgress
                size={45}
                width={6}
                fill={(progress.completed / progress.total) * 100}
                rotation={0}
                tintColor={myTheme.primary}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor='#f6faf9'
              >
                {() => (
                  <MyText
                    text={`${(progress.completed / progress.total) * 100}%`}
                    weight={myFontWeight.semiBold}
                    styleProps={{ color: myTextColor.primary, fontSize: 15 }}
                  />
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Shadow>
  )
}

export default MyClassCard