import Entypo from '@expo/vector-icons/Entypo'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Button, LoaderScreen, TouchableOpacity, View } from 'react-native-ui-lib'

import ClassList from '@/components/common/ClassList'
import CourseDescription from '@/components/common/CourseDescription'
import InstructorBio from '@/components/common/InstructorBio'
import MyLink from '@/components/common/MyLink'
import MyText from '@/components/common/MyText'
import Overview from '@/components/common/Overview'
import ChooseClassModal from '@/components/course-detail/ChooseClassModal'
import RatingList from '@/components/course-detail/RatingList'
import SessionList from '@/components/course-detail/SessionList'
import { height, width, myFontWeight, myTextColor, myTheme, LEVEL, COURSE_STATUS } from '@/contracts/constants'
import { ICourseDetail } from '@/contracts/interfaces/course.interface'
import { ICourseFeedbackListResponse } from '@/contracts/interfaces/feedback.interface'
import { IPagination } from '@/contracts/types'
import useCourse from '@/hooks/api/useCourse'
import useFeedback from '@/hooks/api/useFeedback'

const defaultCourseDetail: ICourseDetail = {
  _id: '',
  code: '',
  title: '',
  description: '',
  price: 0,
  level: LEVEL.BASIC,
  type: [],
  duration: 0,
  thumbnail: '',
  media: [],
  status: COURSE_STATUS.DRAFT,
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
  learnerClass: null,
  classes: []
}

const CourseDetailScreen = () => {
  const { courseId } = useLocalSearchParams()
  const router = useRouter()
  const [collapseClass, setCollapseClass] = useState(true)
  const [collapseSession, setCollapseSession] = useState(true)
  const [data, setData] = useState<ICourseDetail>(defaultCourseDetail)
  const [feedbackData, setFeedbackData] = useState<IPagination<ICourseFeedbackListResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chooseClassModal, setchooseClassModal] = useState(-1)
  const [chooseClass, setChooseClass] = useState('')

  const { getCourseDetail } = useCourse()
  const { getCourseFeedbackList } = useFeedback()
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const [courseDetail, feedbackList] = await Promise.all([
        getCourseDetail(courseId as string),
        getCourseFeedbackList(courseId as string)
      ])
      if (courseDetail && typeof courseDetail !== 'string' && feedbackList && typeof feedbackList !== 'string') {
        setFeedbackData(feedbackList)
        setData(courseDetail)
      }
      setIsLoading(false)
    })()
  }, [courseId, getCourseDetail, getCourseFeedbackList])

  const handleChooseClass = (classId: string) => {
    return classId === chooseClass ? setChooseClass('') : setChooseClass(classId)
  }

  const handleEnrolClass = () => {
    router.push({
      pathname: '/(app)/(course)/checkout',
      params: {
        classId: chooseClass,
        instructorName: data.instructor.name,
        title: data.title,
        image: data.thumbnail,
        price: data.price,
        discount: data.discount
      }
    })
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
          <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }} style={{ flex: 1 }}>
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
            <InstructorBio contactButton={false} instructorInfo={data.instructor} />
            <TouchableOpacity
              onPress={() => setCollapseClass(!collapseClass)}
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                width: (width * 11) / 12,
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
                marginHorizontal: 15
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
              <Entypo name={!collapseClass ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
            </TouchableOpacity>
            <Collapsible collapsed={collapseClass}>
              <ClassList classList={data.classes} />
            </Collapsible>
            <TouchableOpacity
              onPress={() => setCollapseSession(!collapseSession)}
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                width: (width * 11) / 12,
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
                marginHorizontal: 15
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
              <Entypo name={!collapseSession ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
            </TouchableOpacity>
            <Collapsible collapsed={collapseSession}>
              <SessionList sessionList={data.sessions} />
            </Collapsible>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                width: (width * 11) / 12,
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
                marginHorizontal: 15
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
              {feedbackData?.docs.length !== 0 ? (
                <MyLink
                  href={{
                    pathname: '/ratinglist',
                    params: {
                      courseId
                    }
                  }}
                  text='Xem thêm'
                  styleProps={{ color: myTextColor.primary, fontFamily: myFontWeight.semiBold }}
                />
              ) : undefined}
            </View>
            {feedbackData?.docs.length !== 0 ? (
              <RatingList feedbackList={feedbackData?.docs || []} />
            ) : (
              <MyText
                text='Khóa học này chưa có đánh giá'
                styleProps={{
                  color: myTextColor.caption,
                  alignSelf: 'center',
                  paddingBottom: 22.5,
                  paddingTop: 10
                }}
              />
            )}
          </ScrollView>
          <ChooseClassModal
            classList={data.classes.filter((value) => value.learnerClass === null)}
            handleChooseClass={handleChooseClass}
            chooseClass={chooseClass}
            chooseClassModal={chooseClassModal}
            setChooseClassModal={setchooseClassModal}
          />
          {data.classes.filter((value) => value.learnerClass === null).length === 0 ? undefined : (
            <View
              style={{
                height: height / 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                paddingVertical: 5,
                backgroundColor: '#FFF'
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
          )}
        </KeyboardAvoidingView>
      )}
    </>
  )
}
export default CourseDetailScreen
