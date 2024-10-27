import * as Linking from 'expo-linking'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Button, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import MyCheckoutCard from '@/components/course-detail/MyCheckoutCard'
import { myFontWeight, myTheme, width } from '@/contracts/constants'
import useClass from '@/hooks/api/useClass'

const CheckOutScreen = () => {
  const { classId, instructorName, title, image, price, discount } = useLocalSearchParams()
  const { enrolClass } = useClass()
  const [isLoading, setIsLoading] = useState(false)

  const handleEnrolClass = async () => {
    setIsLoading(true)
    const data = await enrolClass(classId as string)
    if (data && typeof data !== 'string') {
      await Linking.openURL('https://test-payment.momo.vn/shortlink/WSHBcacmBj')
    } else {
      console.log('Fail')
    }
    setIsLoading(false)
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        paddingTop: 12
      }}
    >
      <MyCheckoutCard
        image={image as string}
        instructor={instructorName as string}
        title={title as string}
        price={`${Number(price as string).toLocaleString()}đ`}
      />
      <Shadow style={{ width, flexDirection: 'column', alignItems: 'center' }}>
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
            <MyText text={discount ? `${Number(discount as string).toLocaleString()}đ` : '0đ'} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingVertical: 16 }}>
          <MyText text='Tổng cộng' />
          <MyText
            text={
              !discount
                ? `${Number(price as string).toLocaleString()}đ`
                : `${(Number(price as string) - Number(discount as string)).toLocaleString()}đ`
            }
          />
        </View>
        <Button
          onPress={() => handleEnrolClass()}
          size='large'
          label='Thanh toán'
          backgroundColor={myTheme.primary}
          labelStyle={{ fontFamily: myFontWeight.bold }}
          style={{ marginVertical: 16, width: '90%' }}
        />
      </Shadow>
    </View>
  )
}

export default CheckOutScreen
