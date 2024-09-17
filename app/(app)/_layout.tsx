import { Header, HeaderBackButton } from '@react-navigation/elements'
import { Redirect, Stack, useGlobalSearchParams, useRouter } from 'expo-router'

import { useSession } from '@/contexts/AuthContext'
import { myFontWeight } from '@/contracts/constants'

export default function AppLayout() {
  const { accessToken } = useSession()
  const router = useRouter()

  const { title } = useGlobalSearchParams<{ title: string }>()
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
      <Stack.Screen
        name='(course)/course-detail/[courseId]'
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
              title={title}
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
        name='(course)/combo-detail/[comboCourseId]'
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
              title={title}
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
