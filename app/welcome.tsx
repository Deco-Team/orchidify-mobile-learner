import { router } from 'expo-router'
import { Dimensions } from 'react-native'
import { Button, View } from 'react-native-ui-lib'

import Banner from '@/assets/images/login-banner.svg'
import MyText from '@/components/MyText'
import { myFontWeight, myTextColor, myTheme } from '@/constants'
import { useSession } from '@/contexts/ctx'

export default function Welcome() {
  const { login } = useSession()
  const height = Dimensions.get('screen').height
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: height < 668 ? 10 : 100, paddingTop: 100 }}>
      {/* Responsive paddingTop */}
      <Banner />
      <MyText
        weight={myFontWeight.semiBold}
        styleProps={{ fontSize: 26, marginTop: height < 668 ? 10 : 100, marginHorizontal: 5 }}
        text='Chào mừng tới Orchidify'
      />
      {/* Responsive marginTop */}
      <MyText
        styleProps={{
          textAlign: 'center',
          marginBottom: 20,
          marginTop: 25,
          color: myTextColor.caption,
          fontSize: 14
        }}
        text='Cùng khám phá những khóa học chất lượng hàng đầu của chúng tôi.'
      />
      <Button
        size='large'
        style={{
          marginTop: 45,
          marginBottom: 20,
          paddingHorizontal: 125,
          backgroundColor: myTheme.primary
        }}
        labelStyle={{
          fontFamily: myFontWeight.semiBold,
          fontSize: 16
        }}
        label='Đăng ký'
      />
      <MyText
        weight={myFontWeight.semiBold}
        styleProps={{ color: myTextColor.primary, fontSize: 16 }}
        onPress={() => {
          login()
          router.replace('/')
        }}
        text='Đã có tài khoản'
      />
    </View>
  )
}
