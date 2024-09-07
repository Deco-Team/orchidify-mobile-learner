import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { View } from 'react-native-ui-lib'

import { SessionProvider } from '@/contexts/AuthContext'
SplashScreen.preventAutoHideAsync()

export default function Root() {
  // Set up the auth context and render our layout inside of it.

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
      flex: 1,
      paddingTop: 50
    }
  })

  return (
    <View useSafeArea={Platform.OS === 'ios'} style={styles.container}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </View>
  )
}
