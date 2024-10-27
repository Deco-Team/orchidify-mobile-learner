import { Feather } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { LoaderScreen, TextField } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import FilterModal from '@/components/course-list/FilterModal'
import MyCourseCard from '@/components/course-list/MyCourseCard'
import { COURSE_STATUS, height, myDeviceHeight, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { ICourseListResponse } from '@/contracts/interfaces/course.interface'
import { IPagination } from '@/contracts/types'
import useCourse from '@/hooks/api/useCourse'

const CourseScreen = () => {
  //#region state variable
  const [data, setData] = useState<IPagination<ICourseListResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getCourseList } = useCourse()

  const [filterModal, setFilterModal] = useState(-1)
  const [filterCourseType, setFilterCourseType] = useState<string[]>([])
  const [filterLevel, setFilterLevel] = useState<string[]>([])
  const [sort, setSort] = useState<string[]>([])
  const [sortTitle, setSortTitle] = useState<'title.asc' | 'title.desc' | ''>('')
  const [sortPrice, setSortPrice] = useState<'price.asc' | 'price.desc' | ''>('')

  const [searchKey, setSearchKey] = useState('')

  const [refreshing, setRefreshing] = useState(false)
  //#endregion

  //#region event function
  const handleApplyFilter = async () => {
    setSort([sortPrice, sortTitle].filter((value) => value === ''))
    setIsLoading(true)
    const data = await getCourseList({
      title: searchKey,
      type: filterCourseType.join(', '),
      sort: sort.join('_')
    })
    if (data && typeof data !== 'string') {
      setData(data)
    }
    setIsLoading(false)
    setFilterModal(-1)
  }

  const onRefresh = useCallback(() => {
    setSort([sortPrice, sortTitle].filter((value) => value === ''))
    setRefreshing(true)
    ;(async () => {
      const data = await getCourseList({
        title: searchKey,
        type: filterCourseType.join(', '),
        sort: sort.join('_')
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setRefreshing(false)
    })()
  }, [filterCourseType, getCourseList, searchKey, sort, sortPrice, sortTitle])

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

  const handleClearFilter = () => {
    setFilterCourseType([])
    setFilterLevel([])
    setSortTitle('')
    setSortPrice('')
    setSort([])
  }

  //#endregion

  return (
    <>
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
                ListEmptyComponent={() => (
                  <MyText
                    styleProps={{ fontFamily: myFontWeight.semiBold, color: myTextColor.caption }}
                    text='Không có dữ liệu'
                  />
                )}
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
                  <MyCourseCard
                    key={value.item._id}
                    id={value.item._id}
                    image={value.item.thumbnail}
                    title={value.item.title}
                    price={value.item.price}
                    publishStatus={value.item.status === COURSE_STATUS.ACTIVE}
                    instructor={value.item.instructor.name}
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
      <FilterModal
        handleClearFilter={handleClearFilter}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        filterCourseType={filterCourseType}
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
        setFilterCourseType={setFilterCourseType}
        handleApplyFilter={handleApplyFilter}
        setSortPrice={setSortPrice}
        setSortTitle={setSortTitle}
        sortPrice={sortPrice}
        sortTitle={sortTitle}
        isLoading={isLoading}
      />
    </>
  )
}

export default CourseScreen
