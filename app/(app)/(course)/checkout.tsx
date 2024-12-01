import { useStripe } from '@stripe/stripe-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Button, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import MyCheckoutCard from '@/components/course-detail/MyCheckoutCard'
import { myFontWeight, myTheme, width } from '@/contracts/constants'
import { errorMessage, successMessage } from '@/contracts/messages'
import useClass from '@/hooks/api/useClass'
import { extractMessage } from '@/utils'

const CheckOutScreen = () => {
  const { classId, instructorName, title, image, price, discount, finalPrice } = useLocalSearchParams()
  const { enrolClass } = useClass()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEnrolClass = async () => {
    setLoading(true)
    const data = await enrolClass(classId as string)
    if (data && typeof data !== 'string') {
      await initPaymentSheet({
        merchantDisplayName: 'Orchidify',
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true
      })
      const { error } = await presentPaymentSheet()
      if (error) {
        Alert.alert('Lỗi', extractMessage(errorMessage.ERM025, ['thanh toán']))
      } else {
        Alert.alert('Thành công', successMessage.SSM033)
        router.push('/(tabs)/myclass')
      }
    } else {
      Alert.alert(errorMessage.ERM033)
    }
    setLoading(false)
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        paddingTop: 10
      }}
    >
      <MyCheckoutCard
        discount={Number(discount as string)}
        finalPrice={Number(finalPrice as string)}
        image={image as string}
        instructor={instructorName as string}
        title={title as string}
        price={`${Number(price as string).toLocaleString()}đ`}
      />
      <View backgroundColor='white' style={{ elevation: 5, width, flexDirection: 'column', alignItems: 'center' }}>
        <MyText text='Chi tiết thanh toán' styleProps={{ fontSize: 16, margin: 16 }} weight={myFontWeight.bold} />
        <View
          style={{ paddingBottom: 16, borderBottomWidth: 0.5, width: '90%', gap: 10, borderBottomColor: '#f4f4f4' }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MyText text='Khóa học' />
            <MyText text={`${Number(price as string).toLocaleString()}đ`} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MyText text='Giảm giá' />
            <MyText text={`${(Number(price as string) - Number(finalPrice as string)).toLocaleString()}đ`} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingVertical: 16 }}>
          <MyText text='Tổng cộng' />
          <MyText text={`${Number(finalPrice as string).toLocaleString()}đ`} />
        </View>
        <Button
          onPress={() => handleEnrolClass()}
          size='large'
          label='Thanh toán'
          disabled={loading}
          backgroundColor={myTheme.primary}
          labelStyle={{ fontFamily: myFontWeight.bold }}
          style={{ marginVertical: 16, width: '90%' }}
        />
      </View>
    </View>
  )
}

export default CheckOutScreen
