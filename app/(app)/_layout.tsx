import { Header, HeaderBackButton } from '@react-navigation/elements'
import { Redirect, Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { Appearance, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useSession } from '@/contexts/AuthContext'
import { myFontWeight } from '@/contracts/constants'
import useNotification from '@/hooks/api/useNotification'
import { getRegistrationToken } from '@/utils/push-notification'

export default function AppLayout() {
  const { accessToken } = useSession()
  const router = useRouter()

  const { title } = useGlobalSearchParams<{ title: string }>()
  const { registerUserDevice } = useNotification()

  useEffect(() => {
    if (accessToken) {
      ;(async () => {
        const fcmToken = await getRegistrationToken()

        if (fcmToken) {
          try {
            const currentToken = await SecureStore.getItemAsync('fcm_token')
            if (!currentToken || currentToken !== fcmToken) {
              registerUserDevice({ fcmToken, browser: 'None', os: 'Android' })
              SecureStore.setItemAsync('fcm_token', fcmToken)
            }
          } catch (error) {
            console.log(error)
          }
        }
      })()
    }
  }, [accessToken, registerUserDevice])

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
          name='(class)/class-detail/[classId]/index'
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
        <Stack.Screen name='(class)/session-detail/[sessionId]' options={{ headerShown: false }} />
        <Stack.Screen
          name='(class)/assignment-detail/[assignmentId]'
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
                title='Thông tin bài tập'
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name='(course)/instructor/[instructorId]'
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
                title='Thông tin giảng viên'
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name='(course)/certificate'
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
                title='Thông tin chứng chỉ'
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name='(class)/class-detail/[classId]/chat-box/[instructorId]'
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
