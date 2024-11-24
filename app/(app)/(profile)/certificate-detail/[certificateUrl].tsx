import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

import { height, width } from '@/contracts/constants'

const CertificateDetailScreen = () => {
  const { certificateUrl } = useLocalSearchParams()

  return (
    <View style={{ width, height, padding: 15, backgroundColor: '#FFF' }}>
      <Image source={(certificateUrl as string).replace('pdf', 'png')} style={{ width: '100%', height: '75%' }} />
    </View>
  )
}

export default CertificateDetailScreen
