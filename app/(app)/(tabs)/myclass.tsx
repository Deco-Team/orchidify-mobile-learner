import { Feather } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LoaderScreen, TextField } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { height, myDeviceHeight, myFontWeight, myTheme, width } from '@/contracts/constants'
import { IClass } from '@/contracts/interfaces/class.interface'
import { IPagination } from '@/contracts/types'
import useClass from '@/hooks/api/useClass'
import MyClassCard from '@/components/class-list/MyClassCard'

const MyClassScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [filterModal, setFilterModal] = useState(-1)
  const [searchKey, setSearchKey] = useState('')
  const { getClassList } = useClass()
  const [data, setData] = useState<IPagination<IClass> | null>(null)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    ;(async () => {
      // const data = await getCourseList({
      //   title: searchKey,
      //   type: filterCourseType.join(', '),
      //   sort: sortPrice
      // })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setRefreshing(false)
    })()
  }, [data])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const data = await getClassList({
        title: searchKey
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setIsLoading(false)
    })()
  }, [getClassList, searchKey])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#FFF' }}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {isLoading ? (
            <LoaderScreen
              size='large'
              message='Đang tải...'
              color={myTheme.primary}
              messageStyle={{ fontFamily: myFontWeight.regular }}
            />
          ) : (
            <FlatList
              ListHeaderComponent={
                <TextField
                  inputMode='text'
                  value={searchKey}
                  onChangeText={setSearchKey}
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 25 }}
                      name='search'
                      size={24}
                      color='grey'
                    />
                  }
                  trailingAccessory={
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        position: 'absolute',
                        top: height < myDeviceHeight.sm ? 26 : 33,
                        right: 20
                      }}
                      onPress={() => setFilterModal(filterModal === -1 ? 1 : -1)}
                    >
                      <Feather name='filter' size={24} color='gray' />
                    </TouchableOpacity>
                  }
                  placeholder='Tìm kiếm'
                  placeholderTextColor='grey'
                  fieldStyle={{
                    paddingVertical: 20
                  }}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 7,
                    width: (width * 11) / 12,
                    borderColor: 'lightgrey',
                    height: height < myDeviceHeight.sm ? 60 : 70,
                    paddingLeft: 55,
                    paddingRight: 15,
                    fontSize: 16,
                    overflow: 'hidden',
                    fontFamily: myFontWeight.regular,
                    marginHorizontal: 10
                  }}
                />
              }
              data={data?.docs}
              renderItem={(value) => (
                <MyClassCard
                  title={value.item.title}
                  instructorName={value.item.instructor.name}
                  classCode={value.item.code}
                  id={value.item._id}
                  image={value.item.thumbnail}
                  progress={value.item.progress}
                />
              )}
              refreshControl={
                <RefreshControl colors={[myTheme.primary]} refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ alignItems: 'center', rowGap: 15, height: 'auto', paddingBottom: 50 }}
            />
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  )
}

export default MyClassScreen
