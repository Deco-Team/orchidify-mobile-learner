import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LoaderScreen } from 'react-native-ui-lib'

import MyCertificateCard from '@/components/certificate/MyCertificateCard'
import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, myTheme } from '@/contracts/constants'
import { ICertificate } from '@/contracts/interfaces/certificate.interface'
import { IPagination } from '@/contracts/types'
import useCertificate from '@/hooks/api/useCertificate'

const CertificateScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { getCertificationList } = useCertificate()
  const [data, setData] = useState<IPagination<ICertificate> | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    ;(async () => {
      setRefreshing(true)
      const data = await getCertificationList({
        limit: 90, //TODO: Fix later,
        page: 1
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setRefreshing(false)
    })()
  }, [getCertificationList])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const data = await getCertificationList({})
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setIsLoading(false)
    })()
  }, [getCertificationList])

  return (
    <>
      {isLoading ? (
        <LoaderScreen
          size='large'
          message='Đang tải...'
          color={myTheme.primary}
          messageStyle={{ fontFamily: myFontWeight.regular }}
        />
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFF' }}
            keyboardVerticalOffset={100}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <FlatList
                refreshControl={
                  <RefreshControl colors={[myTheme.primary]} refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={() => (
                  <MyText
                    styleProps={{ fontFamily: myFontWeight.semiBold, color: myTextColor.caption }}
                    text='Không có dữ liệu'
                  />
                )}
                contentContainerStyle={{
                  alignItems: 'center',
                  rowGap: 15,
                  height: 'auto',
                  paddingBottom: 50,
                  paddingTop: 10
                }}
                renderItem={(value) => (
                  <MyCertificateCard
                    receiveDate={value.item.updatedAt}
                    name={value.item.name}
                    image={value.item.url}
                    id={value.item._id}
                    code={value.item.code}
                    key={value.item._id}
                  />
                )}
                data={data?.docs}
              />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      )}
    </>
  )
}

export default CertificateScreen
