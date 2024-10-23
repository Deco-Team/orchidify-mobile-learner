import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Avatar, Button, LoaderScreen, TouchableOpacity, View } from 'react-native-ui-lib'

import MyLink from '@/components/MyLink'
import MyText from '@/components/MyText'
import ClassList from '@/components/course-detail/ClassList'
import Overview from '@/components/course-detail/Overview'
import RatingList from '@/components/course-detail/RatingList'
import SessonList from '@/components/course-detail/SessonList'
import { height, width, myFontWeight, myTextColor, myTheme, LEVEL } from '@/contracts/constants'
import { ICourseDetail } from '@/contracts/interfaces/course.interface'
import useCourse from '@/hooks/api/useCourse'

const defaultCourseDetail: ICourseDetail = {
  _id: '',
  code: '',
  title: '',
  description: '',
  price: 500000,
  level: LEVEL.BASIC, // Assuming LEVEL is an enum or string
  type: [],
  duration: 0,
  thumbnail: '',
  media: [],
  status: '', // or any default status
  sessions: [],
  learnerLimit: 0,
  rate: 0,
  discount: 0,
  gardenRequiredToolkits: '',
  instructorId: '',
  isPublished: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  instructor: {
    _id: '',
    name: '',
    bio: '',
    idCardPhoto: '',
    avatar: ''
  },
  classes: []
}

const CourseDetailScreen = () => {
  const { courseId } = useLocalSearchParams()

  const [readmoreDescription, setReadmoreDescription] = useState<number | undefined>(4)
  const [readmoreInstructor, setReadmoreInstructor] = useState<number | undefined>(4)
  const [collapseClass, setCollapseClass] = useState(true)
  const [collapseSesson, setCollapseSesson] = useState(true)
  const [data, setData] = useState<ICourseDetail>(defaultCourseDetail)
  const [classModal, setClassModal] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [numberOfLinesCourseDescription, setNumberOfLinesCourseDescription] = useState(0)
  const [numberOfLinesInstructor, setNumberOfLinesInstructor] = useState(0)

  const handleCourseDescriptionLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const lineHeight = 18
    const calculatedLines = Math.round(height / lineHeight)
    setNumberOfLinesCourseDescription(calculatedLines)
  }

  const handleInstructorLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const lineHeight = 18
    const calculatedLines = Math.round(height / lineHeight)
    setNumberOfLinesInstructor(calculatedLines)
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  const { getCourseDetail } = useCourse()
  useEffect(() => {
    return classModal === -1 ? bottomSheetModalRef.current?.close() : bottomSheetModalRef.current?.present()
  }, [classModal])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const courseDetail = await getCourseDetail(courseId as string)
      if (courseDetail && typeof courseDetail !== 'string') {
        setData(courseDetail)
      }
      setIsLoading(false)
    })()
  }, [courseId, getCourseDetail])

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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: '#FFF' }}
          keyboardVerticalOffset={100}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
              style={{ paddingHorizontal: 15, flex: 1 }}
            >
              <Overview
                rate={data.rate}
                media={data.media}
                duration={data.duration}
                classCount={data.classes.length}
                sessionCount={data.sessions.length}
                level={data.level}
                learnerLimit={data.learnerLimit}
                title={data.title}
                courseTypes={data.type}
                instructorName={data.instructor.name}
              />
              <MyText
                text='Về khóa học'
                styleProps={{
                  fontFamily: myFontWeight.bold,
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 10,
                  alignSelf: 'flex-start'
                }}
              />
              <MyText
                ellipsizeMode='tail'
                onLayout={handleCourseDescriptionLayout}
                numberOfLines={readmoreDescription}
                styleProps={{
                  textAlign: 'justify',
                  color: myTextColor.caption,
                  width: (width * 11) / 12,
                  alignSelf: 'flex-start'
                }}
                text={data.description}
              />
              <TouchableOpacity
                onPress={() => setReadmoreDescription(readmoreDescription ? undefined : 4)}
                style={{ alignSelf: 'flex-start' }}
              >
                {numberOfLinesCourseDescription < 4 ? null : (
                  <MyText
                    styleProps={{ color: myTextColor.primary }}
                    text={!readmoreDescription ? 'Rút gọn' : 'Xem thêm'}
                  />
                )}
              </TouchableOpacity>
              <MyText
                text='Về giảng viên'
                styleProps={{
                  fontFamily: myFontWeight.bold,
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 10,
                  alignSelf: 'flex-start'
                }}
              />
              <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 10, gap: 10 }}>
                <Avatar
                  source={{
                    uri: 'https://picsum.photos/200'
                  }}
                />
                <View
                  style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 5
                  }}
                >
                  <MyText styleProps={{ fontFamily: myFontWeight.bold }} text='PhongNH' />
                  <MyText text='Trồng hoa' />
                </View>
              </View>
              <MyText
                ellipsizeMode='tail'
                onLayout={handleInstructorLayout}
                numberOfLines={readmoreInstructor}
                styleProps={{
                  textAlign: 'justify',
                  color: myTextColor.caption,
                  width: (width * 11) / 12,
                  alignSelf: 'flex-start'
                }}
                text={data.instructor.bio}
              />

              <TouchableOpacity
                onPress={() => setReadmoreInstructor(readmoreInstructor ? undefined : 4)}
                style={{ alignSelf: 'flex-start' }}
              >
                {numberOfLinesInstructor < 4 ? null : (
                  <MyText
                    styleProps={{ color: myTextColor.primary }}
                    text={!readmoreInstructor ? 'Rút gọn' : 'Xem thêm'}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCollapseClass(!collapseClass)}
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: (width * 11) / 12,
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 10
                }}
              >
                <MyText
                  text='Lớp học'
                  styleProps={{
                    fontFamily: myFontWeight.bold,
                    fontSize: 16,
                    alignSelf: 'flex-start'
                  }}
                />
                <Entypo name={collapseClass ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
              </TouchableOpacity>
              <Collapsible collapsed={collapseClass}>
                <ClassList classList={data.classes} />
              </Collapsible>
              <TouchableOpacity
                onPress={() => setCollapseSesson(!collapseSesson)}
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: (width * 11) / 12,
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 10
                }}
              >
                <MyText
                  text='Nội dung buổi học'
                  styleProps={{
                    fontFamily: myFontWeight.bold,
                    fontSize: 16,
                    alignSelf: 'flex-start'
                  }}
                />
                <Entypo name={collapseSesson ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
              </TouchableOpacity>
              <Collapsible collapsed={collapseSesson}>
                <SessonList sessonList={data.sessions} />
              </Collapsible>
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: (width * 11) / 12,
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 10
                }}
              >
                <MyText
                  text='Đánh giá'
                  styleProps={{
                    fontFamily: myFontWeight.bold,
                    fontSize: 16,
                    alignSelf: 'flex-start'
                  }}
                />
                <MyLink
                  href='/ratinglist'
                  text='Xem thêm'
                  styleProps={{ color: myTextColor.primary, fontFamily: myFontWeight.semiBold }}
                />
              </View>
              <RatingList />
            </ScrollView>
          </TouchableWithoutFeedback>
          <View
            style={{
              height: height / 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
              justifyContent: 'space-between',
              paddingVertical: 5
            }}
          >
            <View>
              <MyText text='Tổng cộng' />
              <MyText
                text='145.000đ'
                styleProps={{
                  fontFamily: myFontWeight.bold,
                  color: myTextColor.primary,
                  fontSize: 18
                }}
              />
            </View>
            <Button
              onPress={() => setClassModal(classModal === -1 ? 1 : -1)}
              size='large'
              label='Tham gia'
              labelStyle={{ fontFamily: myFontWeight.bold }}
              style={{ backgroundColor: myTheme.primary, paddingHorizontal: 50 }}
            />
          </View>
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
              onChange={(index) => setClassModal(index)}
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
            >
              <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
                <MyText text='Awesome 🎉' />
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </KeyboardAvoidingView>
      )}
    </>
  )
}
export default CourseDetailScreen
