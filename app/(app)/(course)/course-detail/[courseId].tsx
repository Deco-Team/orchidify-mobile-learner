import Entypo from '@expo/vector-icons/Entypo'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Button, LoaderScreen, TouchableOpacity, View } from 'react-native-ui-lib'

import MyLink from '@/components/MyLink'
import MyText from '@/components/MyText'
import ChooseClassModal from '@/components/course-detail/ChooseClassModal'
import ClassList from '@/components/course-detail/ClassList'
import CourseDescription from '@/components/course-detail/CourseDescription'
import InstructorBio from '@/components/course-detail/InstructorBio'
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
    avatar: 'https://picsum.photos/200'
  },
  classes: []
}

const CourseDetailScreen = () => {
  const { courseId } = useLocalSearchParams()

  const [collapseClass, setCollapseClass] = useState(true)
  const [collapseSesson, setCollapseSesson] = useState(true)
  const [data, setData] = useState<ICourseDetail>(defaultCourseDetail)
  const [isLoading, setIsLoading] = useState(false)

  const [chooseClassModal, setchooseClassModal] = useState(-1)
  const [chooseClass, setChooseClass] = useState('')

  const { getCourseDetail } = useCourse()

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

  const handleChooseClass = (classId: string) => {
    return classId === chooseClass ? setChooseClass('') : setChooseClass(classId)
  }

  const handleEnrolClass = () => {
    console.log(chooseClass)
  }

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
              <CourseDescription description={data.description} />
              <InstructorBio instructorInfo={data.instructor} />
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
          <ChooseClassModal
            classList={data.classes}
            handleChooseClass={handleChooseClass}
            chooseClass={chooseClass}
            chooseClassModal={chooseClassModal}
            setChooseClassModal={setchooseClassModal}
          />
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
                text={`${data.price.toLocaleString()}đ`}
                styleProps={{
                  fontFamily: myFontWeight.bold,
                  color: myTextColor.primary,
                  fontSize: 18
                }}
              />
            </View>
            <Button
              onPress={
                chooseClassModal === -1
                  ? () => setchooseClassModal(chooseClassModal === -1 ? 1 : -1)
                  : () => handleEnrolClass()
              }
              size='large'
              label='Tham gia'
              disabled={chooseClass === '' && chooseClassModal === 1}
              backgroundColor={myTheme.primary}
              labelStyle={{ fontFamily: myFontWeight.bold }}
              style={{ paddingHorizontal: 50 }}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  )
}
export default CourseDetailScreen
