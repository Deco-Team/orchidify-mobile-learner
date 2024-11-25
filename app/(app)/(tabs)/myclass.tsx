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
import { Button, LoaderScreen, TextField, View } from 'react-native-ui-lib'

import FilterModal from '@/components/class-list/FilterModal'
import MyClassCard from '@/components/class-list/MyClassCard'
import MyText from '@/components/common/MyText'
import { CLASS_STATUS, height, myDeviceHeight, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IClass } from '@/contracts/interfaces/class.interface'
import { IPagination } from '@/contracts/types'
import useClass from '@/hooks/api/useClass'

const MyClassScreen = () => {
  //#region state variable
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [filterModal, setFilterModal] = useState(-1)
  const [filterCourseType, setFilterCourseType] = useState<string[]>([])
  const [filterLevel, setFilterLevel] = useState<string[]>([])
  const [sortTitle, setSortTitle] = useState<'title.asc' | 'title.desc' | ''>('')
  const [searchKey, setSearchKey] = useState('')
  const { getClassList } = useClass()
  const [data, setData] = useState<IPagination<IClass> | null>(null)

  const [classStatus, setClassStatus] = useState<CLASS_STATUS | ''>('')
  const classStatusList = [
    { title: 'Tất cả', value: '' },
    { title: 'Sắp bắt đầu', value: CLASS_STATUS.PUBLISHED },
    { title: 'Đang học', value: CLASS_STATUS.IN_PROGRESS },
    { title: 'Đã kết thúc', value: CLASS_STATUS.COMPLETED }
  ]
  //#endregion

  //#region event function
  const handleApplyFilter = async () => {
    setIsLoading(true)
    const data = await getClassList({
      limit: 90, //TODO: Fix later
      page: 1,
      title: searchKey,
      type: filterCourseType.join(', '),
      sort: sortTitle,
      level: filterLevel,
      status: [classStatus]
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
      const data = await getClassList({
        limit: 90, //TODO: Fix later
        page: 1,
        title: searchKey,
        status: [classStatus],
        level: filterLevel,
        type: filterCourseType.join(', '),
        sort: sortTitle
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setRefreshing(false)
    })()
  }, [classStatus, filterCourseType, filterLevel, getClassList, searchKey, sortTitle])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const data = await getClassList({
        limit: 90, //TODO: Fix later
        page: 1,
        status: [classStatus]
      })
      if (data && typeof data !== 'string') {
        setData(data)
      }
      setIsLoading(false)
    })()
  }, [classStatus, getClassList])

  const handleClearFilter = () => {
    setFilterCourseType([])
    setFilterLevel([])
    setSortTitle('')
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
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss()
            }}
          >
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
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                      onSubmitEditing={() => handleApplyFilter()}
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#f4f4f4',
                        borderRadius: 99,
                        marginBottom: 10,
                        alignItems: 'center'
                      }}
                    >
                      {classStatusList.map((value, i) => (
                        <Button
                          key={i}
                          onPress={() => setClassStatus(value.value as '' | CLASS_STATUS)}
                          label={value.title}
                          size='xSmall'
                          style={{
                            backgroundColor: value.value === classStatus ? myTheme.primary : 'transparent',
                            justifyContent: 'center'
                          }}
                          labelStyle={{
                            fontFamily: myFontWeight.semiBold,
                            fontSize: 13,
                            color: value.value === classStatus ? '#FFF' : myTextColor.caption
                          }}
                        />
                      ))}
                    </View>
                  </View>
                }
                ListEmptyComponent={() => (
                  <MyText
                    styleProps={{ fontFamily: myFontWeight.semiBold, color: myTextColor.caption }}
                    text='Không có dữ liệu'
                  />
                )}
                data={data?.docs}
                renderItem={(value) => (
                  <MyClassCard
                    title={value.item.title}
                    instructorName={value.item.instructor.name}
                    classCode={value.item.code}
                    id={value.item._id}
                    image={value.item.thumbnail}
                    progress={value.item.progress}
                    status={value.item.status}
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
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        filterCourseType={filterCourseType}
        setFilterCourseType={setFilterCourseType}
        setSortTitle={setSortTitle}
        sortTitle={sortTitle}
        handleApplyFilter={handleApplyFilter}
        isLoading={isLoading}
      />
    </>
  )
}

export default MyClassScreen
