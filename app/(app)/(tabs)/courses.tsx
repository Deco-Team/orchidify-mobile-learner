import Feather from '@expo/vector-icons/Feather'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { Button, LoaderScreen, TextField, View } from 'react-native-ui-lib'

import MyCourseCard from '@/components/MyCourseCard'
import MyText from '@/components/MyText'
import { courseTypeItems, height, myDeviceHeight, myFontWeight, myTextColor, myTheme } from '@/contracts/constants'
import { ICourseListResponse } from '@/contracts/interfaces/course.interface'
import { IPagination } from '@/contracts/types'
import useCourse from '@/hooks/api/useCourse'

const CourseScreen = () => {
  const [data, setData] = useState<IPagination<ICourseListResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getCourseList } = useCourse()

  const [filterModal, setFilterModal] = useState(-1)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['60%', '60%'], [])

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

  const handleSortPrice = (value: 'price.asc' | 'price.desc' | '') => {
    if (sortPrice === value) {
      setSortPrice('')
    } else {
      setSortPrice(value)
    }
  }

  const handleCourseType = (label: string) => {
    if (filterCourseType.includes(label)) {
      setfilterCourseType([...filterCourseType.filter((value) => value !== label)])
    } else {
      setfilterCourseType([...filterCourseType, label])
    }
  }

  useEffect(() => {
    return filterModal === -1 ? bottomSheetModalRef.current?.close() : bottomSheetModalRef.current?.present()
  }, [filterModal])

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
      <BottomSheetModalProvider>
        <BottomSheetModal
          enablePanDownToClose
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.7} // Adjust the opacity here
              disappearsOnIndex={-1}
              appearsOnIndex={1}
            />
          )}
          onChange={(index) => setFilterModal(index)}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ alignItems: 'flex-start', width: '100%', padding: 12.5, justifyContent: 'space-between' }}>
              <MyText text='Thể loại' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 15,
                  rowGap: 7.5,
                  width: '100%',
                  padding: 10,
                  flexWrap: 'wrap',
                  marginVertical: 10
                }}
              >
                {courseTypeItems.map((value, i) => (
                  <Button
                    key={i}
                    label={value}
                    outline
                    size='xSmall'
                    onPress={() => handleCourseType(value)}
                    color={filterCourseType.includes(value) ? myTextColor.primary : myTextColor.caption}
                    style={{
                      borderWidth: 1,
                      borderColor: filterCourseType.includes(value) ? myTheme.primary : '#697B7A',
                      backgroundColor: filterCourseType.includes(value) ? myTheme.lightGrey : '#FFF'
                    }}
                    labelStyle={{ fontFamily: myFontWeight.semiBold }}
                  />
                ))}
              </View>
              <MyText text='Sắp xếp theo' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 15,
                  rowGap: 7.5,
                  width: '100%',
                  padding: 10,
                  flexWrap: 'wrap',
                  marginVertical: 10
                }}
              >
                <Button
                  label='$ Cao đến thấp'
                  outline
                  size='xSmall'
                  color={sortPrice === 'price.desc' ? myTextColor.primary : myTextColor.caption}
                  onPress={() => handleSortPrice('price.desc')}
                  style={{
                    borderWidth: 1,
                    borderColor: sortPrice === 'price.desc' ? myTheme.primary : '#697B7A',
                    backgroundColor: sortPrice === 'price.desc' ? myTheme.lightGrey : '#FFF'
                  }}
                  labelStyle={{ fontFamily: myFontWeight.semiBold }}
                />
                <Button
                  label='$ Thấp đến cao'
                  outline
                  size='xSmall'
                  color={sortPrice === 'price.asc' ? myTextColor.primary : myTextColor.caption}
                  onPress={() => handleSortPrice('price.asc')}
                  style={{
                    borderWidth: 1,
                    borderColor: sortPrice === 'price.asc' ? myTheme.primary : '#697B7A',
                    backgroundColor: sortPrice === 'price.asc' ? myTheme.lightGrey : '#FFF'
                  }}
                  labelStyle={{ fontFamily: myFontWeight.semiBold }}
                />
              </View>
              <Button
                label='Áp dụng'
                onPress={handleApplyFilter}
                color='#FFF'
                style={{
                  alignSelf: 'center',
                  backgroundColor: myTheme.primary,
                  width: '100%'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}

export default CourseScreen
