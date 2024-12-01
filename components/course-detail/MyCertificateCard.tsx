import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Button, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTheme, width } from '@/contracts/constants'

interface IMyCertificateCard {
  certificateUrl: string
  name: string
}

const MyCertificateCard: React.FC<IMyCertificateCard> = ({ certificateUrl, name }) => {
  const router = useRouter()

  return (
    <View style={{ marginVertical: 8 }}>
      <Shadow
        style={{
          width: (width * 10) / 12,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Image
          source={certificateUrl.replace('pdf', 'png').replace('http://', 'https://')}
          style={{ width: 100, height: 100, borderRadius: 16, margin: 12.5, marginRight: 7.5 }}
        />
        <View style={{ flex: 1, gap: 40 }}>
          <MyText
            ellipsizeMode='tail'
            numberOfLines={1}
            text={name}
            styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, paddingRight: 12.5 }}
          />

          <Button
            onPress={() =>
              router.push({
                pathname: '/(app)/(course)/certificate',
                params: {
                  certificateUrl
                }
              })
            }
            style={{ gap: 2.5, width: '90%' }}
            iconOnRight
            iconStyle={{ marginTop: 9 }}
            iconSource={() => <Entypo name='chevron-right' size={16} color='#FFF' />}
            label='Xem chứng chỉ'
            labelStyle={{ color: '#FFF', fontFamily: myFontWeight.semiBold, fontSize: 12 }}
            backgroundColor={myTheme.primary}
            size='xSmall'
          />
        </View>
      </Shadow>
    </View>
  )
}

export default MyCertificateCard
