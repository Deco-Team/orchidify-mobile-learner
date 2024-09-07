import { Button, Carousel, View } from 'react-native-ui-lib'

import Banner from '@/assets/images/login-banner.svg'
import MyLink from '@/components/MyLink'
import MyText from '@/components/MyText'
import { height, myDeviceHeight, myDeviceWidth, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'

export default function Welcome() {
  const text = [
    'Cùng khám phá những khóa học chất lượng hàng đầu của chúng tôi',
    'Dễ dàng lựa chọn khóa học phù hợp với mong muốn của bạn',
    'Được tham gia học trực tiếp và cấp chứng chỉ đào tạo'
  ]

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingBottom: height < myDeviceHeight.sm ? 0 : 50
      }}
    >
      <Banner style={{ flexGrow: 1 }} />
      <View style={{ alignItems: 'center', gap: 24, padding: 24 }}>
        <MyText
          weight={myFontWeight.semiBold}
          styleProps={{
            fontSize: width < myDeviceWidth.sm ? 24 : 26
          }}
          text='Chào mừng tới Orchidify'
        />
        <Carousel
          style={{ flexGrow: 0 }}
          loop
          autoplay
          autoplayInterval={3000}
          pageControlPosition='under'
          pageControlProps={{
            color: myTheme.primary
          }}
        >
          {text.map((text) => (
            <MyText
              key={text}
              styleProps={{
                textAlign: 'center',
                color: myTextColor.caption,
                fontSize: 14
              }}
              text={text}
            />
          ))}
        </Carousel>
        <Button
          label='Đăng ký'
          size='large'
          style={{
            backgroundColor: myTheme.primary,
            minWidth: '100%',
            height: 48,
            justifyContent: 'center'
          }}
          labelStyle={{
            fontFamily: myFontWeight.bold,
            fontSize: 16
          }}
        />

        <MyLink
          weight={myFontWeight.medium}
          styleProps={{ color: myTextColor.primary, fontSize: 16 }}
          text='Đã có tài khoản'
          href='/login'
        />
      </View>
    </View>
  )
}

/**
 * 
 * async () => {
            await login('learner@gmail.com', '123456789')
            router.replace('/')
          }
 */
