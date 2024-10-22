import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { Header, HeaderBackButton } from '@react-navigation/elements'
import { Redirect, Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { useRef, useMemo, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import MyText from '@/components/MyText'
import { useSession } from '@/contexts/AuthContext'
import { myFontWeight } from '@/contracts/constants'
import { useStore } from '@/hooks/store/useStore'

export default function AppLayout() {
  const { accessToken } = useSession()
  const router = useRouter()

  const filterState = useStore((filter) => filter.filterState)
  const setFilterState = useStore((setState) => setState.setFilterState)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  useEffect(() => {
    return filterState === -1 ? bottomSheetModalRef.current?.close() : bottomSheetModalRef.current?.present()
  }, [filterState])

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
      </Stack>
      <BottomSheetModalProvider>
        <BottomSheetModal
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.7} // Adjust the opacity here
              disappearsOnIndex={-1}
              appearsOnIndex={1}
            />
          )}
          onChange={(index) => setFilterState(index)}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.contentContainer}>
            <MyText text='Awesome 🎉' />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
