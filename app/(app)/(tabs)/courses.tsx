import { Feather } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LoaderScreen, TextField, View } from 'react-native-ui-lib'

import FilterModal from '@/components/course-list/FilterModal'
import MyCourseCard from '@/components/course-list/MyCourseCard'
import { height, myDeviceHeight, myFontWeight, myTheme } from '@/contracts/constants'
import { ICourseListResponse } from '@/contracts/interfaces/course.interface'
import { IPagination } from '@/contracts/types'
import useCourse from '@/hooks/api/useCourse'

const CourseScreen = () => {
  const [data, setData] = useState<IPagination<ICourseListResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getCourseList } = useCourse()

  const [filterModal, setFilterModal] = useState(-1)
  const [filterCourseType, setfilterCourseType] = useState<string[]>([])
  const [sortPrice, setSortPrice] = useState<'price.asc' | 'price.desc' | ''>('')
  const [searchKey, setSearchKey] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const handleApplyFilter = async () => {
    setIsLoading(true)
    const data = await getCourseList({
      title: searchKey,
      type: filterCourseType.join(', '),
      sort: sortPrice
    })
    if (data && typeof data !== 'string') {
      setData(data)
    }
    setIsLoading(false)
    setFilterModal(-1)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    ;(async () => {
      setIsLoading(true)
      const data = await getCourseList({
        title: searchKey,
        type: filterCourseType.join(', '),
        sort: sortPrice
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setIsLoading(false)
      setRefreshing(false)
    })()
  }, [filterCourseType, getCourseList, searchKey, sortPrice])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const data = await getCourseList({
        title: searchKey
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setIsLoading(false)
    })()
  }, [getCourseList, searchKey])

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: '#FFF' }}
          keyboardVerticalOffset={100}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              contentContainerStyle={{ justifyContent: 'center' }}
              style={{ paddingHorizontal: 10, backgroundColor: '#FFF' }}
            >
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
                  borderColor: 'lightgrey',
                  height: height < myDeviceHeight.sm ? 60 : 70,
                  paddingLeft: 55,
                  paddingRight: 15,
                  fontSize: 16,
                  overflow: 'hidden',
                  fontFamily: myFontWeight.regular,
                  marginHorizontal: 10,
                  marginBottom: 20
                }}
              />
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 25, flex: 1, gap: 15, paddingHorizontal: 10 }}>
                  {isLoading ? (
                    <LoaderScreen
                      size='large'
                      message='Đang tải...'
                      color={myTheme.primary}
                      messageStyle={{ fontFamily: myFontWeight.regular }}
                    />
                  ) : (
                    data?.docs.map((value) => (
                      <MyCourseCard
                        key={value._id}
                        id={value._id}
                        image={value.thumbnail}
                        title={value.title}
                        price={value.price}
                        publishStatus={value.status === 'PUBLISHED'}
                        instructor={value.instructor.name}
                      />
                    ))
                  )}
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
      <FilterModal
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        filterCourseType={filterCourseType}
        setfilterCourseType={setfilterCourseType}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        handleApplyFilter={handleApplyFilter}
      />
    </>
  )
}

export default CourseScreen
