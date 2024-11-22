import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { setBackgroundMessageHandler } from '@react-native-firebase/messaging'
import { Header, HeaderBackButton } from '@react-navigation/elements'
import { StripeProvider } from '@stripe/stripe-react-native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Appearance, Platform, StatusBar, StyleSheet } from 'react-native'
import { View } from 'react-native-ui-lib'

import { SessionProvider } from '@/contexts/AuthContext'
import { myFontWeight } from '@/contracts/constants'
import { firebaseCloudMessaging } from '@/utils/firebase'
SplashScreen.preventAutoHideAsync()

export default function Root() {
  const router = useRouter()

  const [loaded, error] = useFonts({
    'Main-Font-Bold': require('@/assets/fonts/static/WixMadeforText-Bold.ttf'),
    'Main-Font-BoldItalic': require('@/assets/fonts/static/WixMadeforText-BoldItalic.ttf'),
    'Main-Font-ExtraBold': require('@/assets/fonts/static/WixMadeforText-ExtraBold.ttf'),
    'Main-Font-ExtraBoldItalic': require('@/assets/fonts/static/WixMadeforText-ExtraBoldItalic.ttf'),
    'Main-Font-Italic': require('@/assets/fonts/static/WixMadeforText-Italic.ttf'),
    'Main-Font-Medium': require('@/assets/fonts/static/WixMadeforText-Medium.ttf'),
    'Main-Font-MediumItalic': require('@/assets/fonts/static/WixMadeforText-MediumItalic.ttf'),
    'Main-Font-Regular': require('@/assets/fonts/static/WixMadeforText-Regular.ttf'),
    'Main-Font-SemiBold': require('@/assets/fonts/static/WixMadeforText-SemiBold.ttf'),
    'Main-Font-SemiBoldItalic': require('@/assets/fonts/static/WixMadeforText-SemiBoldItalic.ttf')
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })

  setBackgroundMessageHandler(firebaseCloudMessaging, async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage)
  })

  return (
    <StripeProvider
      publishableKey={
        process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
        'pk_test_51QGGvb01iokJDIvLnmxeTnDzRxsY3HQ5UVtOQu0TiSAwkOcdLjdrAViNfCZHbCTwi3oKPI1s7TSD26ZrcFDpMz4k00QEgzvjG4'
      }
    >
      <ActionSheetProvider>
        <View useSafeArea={Platform.OS === 'ios' || Platform.OS === 'android'} style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={Appearance.getColorScheme() === 'dark' ? 'black' : 'transparent'}
          />
          <SessionProvider>
            <Stack>
              <Stack.Screen
                name='(app)'
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='welcome'
                options={{
                  title: '',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='login'
                options={{
                  header: () => (
                    <Header
                      headerLeft={() => (
                        <HeaderBackButton
                          label='Quay lại'
                          labelStyle={{
                            fontFamily: myFontWeight.regular
                          }}
                          onPress={() => router.back()}
                        />
                      )}
                      title='Đăng nhập'
                      headerTitleStyle={{
                        fontFamily: myFontWeight.bold
                      }}
                    />
                  )
                }}
              />
              <Stack.Screen
                name='register'
                options={{
                  header: () => (
                    <Header
                      title='Tạo tài khoản'
                      headerLeft={() => (
                        <HeaderBackButton
                          label='Quay lại'
                          labelStyle={{
                            fontFamily: myFontWeight.regular
                          }}
                          onPress={() => router.back()}
                        />
                      )}
                      headerTitleStyle={{
                        fontFamily: myFontWeight.bold
                      }}
                    />
                  )
                }}
              />
              <Stack.Screen
                name='verify'
                options={{
                  header: () => (
                    <Header
                      title='Xác minh tài khoản'
                      headerTitleStyle={{
                        fontFamily: myFontWeight.bold
                      }}
                    />
                  )
                }}
              />
            </Stack>
          </SessionProvider>
        </View>
      </ActionSheetProvider>
    </StripeProvider>
  )
}
