import { Header, HeaderBackButton } from '@react-navigation/elements'
import { Redirect, Stack, useRouter } from 'expo-router'

import { useSession } from '@/contexts/AuthContext'
import { myFontWeight } from '@/contracts/constants'

export default function AppLayout() {
  const { accessToken } = useSession()
  const router = useRouter()
  if (!accessToken) {
    return <Redirect href='../../../welcome' />
  }
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(profile)/editprofile'
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
              title='Cập nhật tài khoản'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold
              }}
            />
          )
        }}
      />
      <Stack.Screen
        name='(profile)/certificate'
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
              title='Chứng chỉ của tôi'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold
              }}
            />
          )
        }}
      />
    </Stack>
  )
}
