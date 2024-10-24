import { Header, HeaderBackButton } from '@react-navigation/elements'
import { Redirect, Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    <GestureHandlerRootView>
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
          name='(course)/ratinglist'
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
                title='Đánh giá'
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
          name='(course)/checkout'
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
                title='Xác nhận thanh toán'
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
          name='(course)/gardeninformation'
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
    </GestureHandlerRootView>
  )
}
