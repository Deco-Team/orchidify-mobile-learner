import { Header, HeaderBackButton } from '@react-navigation/elements'
import { Redirect, Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { Appearance, StatusBar } from 'react-native'
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
      <StatusBar
        translucent={false}
        backgroundColor={Appearance.getColorScheme() === 'dark' ? 'black' : 'transparent'}
      />
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
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name='(course)/garden-information/[gardenId]'
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
                title='Thông tin nhà vườn'
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name='(class)/class-detail/[classId]'
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
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name='(class)/session-detail/[sessionId]'
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
