import { Entypo } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Button, View } from 'react-native-ui-lib'

import MyText from '../common/MyText'

import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

interface IMyCertificateCard {
  name: string
  image: string
  id: string
  code: string
  receiveDate: string
}

const MyCertificateCard: React.FC<IMyCertificateCard> = ({ id, code, image, name, receiveDate }) => {
  const router = useRouter()

  return (
    <Shadow
      style={{ width: (width * 11) / 12, minHeight: 125, borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}
    >
      <Image
        source={image.replace('pdf', 'png')}
        style={{ width: 100, height: 100, borderRadius: 16, margin: 12.5, marginRight: 7.5 }}
      />
      <View style={{ flex: 1 }}>
        <MyText
          ellipsizeMode='tail'
          numberOfLines={1}
          text={name}
          styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18, paddingRight: 12.5 }}
        />
        <MyText
          text={`Ngày nhận: ${dayjs(receiveDate).format('DD/MM/YYYY')}`}
          styleProps={{ color: myTextColor.caption, fontSize: 12 }}
        />
        <MyText text={code} styleProps={{ color: myTextColor.caption, fontSize: 12 }} />

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
          <Button
            backgroundColor={myTheme.primary}
            labelStyle={{ fontFamily: myFontWeight.semiBold }}
            label='Xem chứng chỉ '
            iconOnRight
            size='xSmall'
            style={{ borderRadius: 6, width: '100%' }}
            onPress={() =>
              router.push({
                pathname: '/(app)/(profile)/[certificateUrl]',
                params: {
                  certificateUrl: image
                }
              })
            }
            iconSource={() => <Entypo name='chevron-right' size={15} color='white' />}
          />
        </View>
      </View>
    </Shadow>
  )
}

export default MyCertificateCard
