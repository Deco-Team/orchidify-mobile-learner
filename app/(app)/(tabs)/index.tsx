import { Feather } from '@expo/vector-icons'
import { Href, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Button, LoaderScreen, TextField, View } from 'react-native-ui-lib'

import MyLink from '@/components/common/MyLink'
import MyText from '@/components/common/MyText'
import FilterModal from '@/components/course-list/FilterModal'
import ClassCarousel from '@/components/home/ClassCarousel'
import CourseCarousel from '@/components/home/CourseCarousel'
import {
  CLASS_STATUS,
  courseTypeItemsShort,
  height,
  LEVEL,
  myDeviceHeight,
  myFontWeight,
  myTextColor,
  myTheme,
  width
} from '@/contracts/constants'
import { IClass } from '@/contracts/interfaces/class.interface'
import { ICourseListResponse } from '@/contracts/interfaces/course.interface'
import { IPagination } from '@/contracts/types'
import useClass from '@/hooks/api/useClass'
import useCourse from '@/hooks/api/useCourse'

interface IHomeLayout {
  title: string
  learnMoreLink: Href
  component: React.JSX.Element
}

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [filterModal, setFilterModal] = useState(-1)
  const [filterCourseType, setFilterCourseType] = useState<string[]>([])
  const [filterLevel, setFilterLevel] = useState<string[]>([])
  const [sortTitle, setSortTitle] = useState<'title.asc' | 'title.desc' | ''>('')
  const [sortPrice, setSortPrice] = useState<'price.asc' | 'price.desc' | ''>('')
  const router = useRouter()
  const [recommendedCourseData, setRecommendedCourseData] = useState<IPagination<ICourseListResponse> | null>(null)
  const [bestSellerCourseData, setBestSellerCourseData] = useState<IPagination<ICourseListResponse> | null>(null)
  const [basicCourseData, setBasicCourseData] = useState<IPagination<ICourseListResponse> | null>(null)
  const [inProgressClassData, setInProgressClassData] = useState<IPagination<IClass> | null>(null)

  const { getCourseListBestSeller, getCourseListRecommend, getCourseList } = useCourse()
  const { getClassList } = useClass()

  const menuLayout: IHomeLayout[] = [
    {
      title: 'Tìm theo thể loại',
      learnMoreLink: {
        pathname: '/(app)/courses'
      },
      component: (
        <View
          style={{
            flexDirection: 'row',
            columnGap: 15,
            rowGap: 7.5,
            width: '100%',
            paddingVertical: 10,
            flexWrap: 'wrap',
            marginHorizontal: 15
          }}
        >
          {courseTypeItemsShort.map((value, i) => {
            return (
              <Button
                key={i}
                label={value}
                outline
                size='xSmall'
                onPress={() =>
                  router.push({
                    pathname: '/(app)/courses',
                    params: { forwardFilterCourseType: [value].join(', ') }
                  })
                }
                color={myTextColor.caption}
                style={{
                  borderWidth: 1,
                  width: 'auto',
                  borderColor: '#697B7A',
                  backgroundColor: '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
            )
          })}
        </View>
      )
    },
    {
      title: 'Tiếp tục khóa học',
      learnMoreLink: {
        pathname: '/(app)/myclass'
      },
      component:
        inProgressClassData?.docs.length !== 0 ? (
          <ClassCarousel data={inProgressClassData?.docs || []} />
        ) : (
          <MyText
            styleProps={{
              fontFamily: myFontWeight.semiBold,
              color: myTextColor.caption,
              textAlign: 'center',
              marginTop: 15
            }}
            text='Không có lớp học'
          />
        )
    },
    {
      title: 'Gợi ý khóa học',
      learnMoreLink: {
        pathname: '/(app)/courses'
      },
      component: <CourseCarousel data={recommendedCourseData?.docs || []} />
    },
    {
      title: 'Khóa học cơ bản',
      learnMoreLink: {
        pathname: '/(app)/courses'
      },
      component: <CourseCarousel data={basicCourseData?.docs || []} />
    },
    {
      title: 'Khóa học bán chạy',
      learnMoreLink: {
        pathname: '/(app)/courses'
      },
      component: <CourseCarousel data={bestSellerCourseData?.docs || []} />
    }
  ]

  const handleApplyFilter = () => {
    router.push({
      pathname: '/(app)/courses',
      params: {
        forwardSearchKey: searchKey,
        forwardSortPrice: sortPrice,
        forwardSortTitle: sortTitle,
        forwardSort: [sortPrice, sortTitle].filter((value) => value === '').join('_'),
        forwardFilterCourseType: filterCourseType.join(', '),
        forwardFilterLevel: filterLevel.join(', ')
      }
    })
    setSearchKey('')
    setFilterModal(-1)
    handleClearFilter()
  }

  const handleClearFilter = () => {
    setFilterCourseType([])
    setFilterLevel([])
    setSortTitle('')
    setSortPrice('')
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const [bestSellerCourses, recommendedCourses, basicCourses, inProgressClasses] = await Promise.all([
        getCourseListBestSeller({ limit: 5, page: 1 }),
        getCourseListRecommend({ limit: 5, page: 1 }),
        getCourseList({ level: [LEVEL.BASIC] }),
        getClassList({ status: [CLASS_STATUS.IN_PROGRESS] })
      ])
      if (
        recommendedCourses &&
        typeof recommendedCourses !== 'string' &&
        bestSellerCourses &&
        typeof bestSellerCourses !== 'string' &&
        basicCourses &&
        typeof basicCourses !== 'string' &&
        inProgressClasses &&
        typeof inProgressClasses !== 'string'
      ) {
        setBasicCourseData(basicCourses)
        setBestSellerCourseData(bestSellerCourses)
        setInProgressClassData(inProgressClasses)
        setRecommendedCourseData(recommendedCourses)
      }
      setIsLoading(false)
    })()
  }, [getClassList, getCourseList, getCourseListBestSeller, getCourseListRecommend])

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
              <ScrollView>
                <TextField
                  onSubmitEditing={() => handleApplyFilter()}
                  inputMode='text'
                  value={searchKey}
                  onChangeText={setSearchKey}
                  leadingAccessory={
                    <Feather
                      style={{ position: 'absolute', top: height < myDeviceHeight.sm ? 36 : 43, left: 30 }}
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
                        right: 25
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
                    alignSelf: 'center',
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
                {menuLayout.map((value, i) => (
                  <View key={i} style={{ paddingBottom: 15 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 15
                      }}
                    >
                      <MyText styleProps={{ fontFamily: myFontWeight.bold }} text={value.title} />
                      <MyLink styleProps={{ color: myTextColor.primary }} text='Xem thêm' href={value.learnMoreLink} />
                    </View>
                    {value.component}
                  </View>
                ))}
              </ScrollView>
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
