import { Entypo, Feather } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Button, Chip, LoaderScreen, View } from 'react-native-ui-lib'

import FeedbackModal from '@/components/class-detail/FeedbackModal'
import CourseDescription from '@/components/common/CourseDescription'
import InstructorBio from '@/components/common/InstructorBio'
import MyLink from '@/components/common/MyLink'
import MyText from '@/components/common/MyText'
import Overview from '@/components/common/Overview'
import RatingList from '@/components/course-detail/RatingList'
import SessionList from '@/components/course-detail/SessionList'
import { myTheme, myFontWeight, LEVEL, CLASS_STATUS, width, myTextColor } from '@/contracts/constants'
import { IClassDetail } from '@/contracts/interfaces/class.interface'
import { IClassFeedbackListResponse } from '@/contracts/interfaces/feedback.interface'
import { IPagination } from '@/contracts/types'
import useClass from '@/hooks/api/useClass'
import useFeedback from '@/hooks/api/useFeedback'
import { calculateDateList, extractSlot, extractWeekday } from '@/utils'

const defaultClassDetail: IClassDetail = {
  _id: '',
  code: '',
  courseId: '',
  createdAt: '',
  description: '',
  duration: 0,
  garden: {
    _id: '',
    id: '',
    name: ''
  },
  gardenId: '',
  gardenRequiredToolkits: '',
  histories: [],
  id: '',
  instructor: {
    _id: '',
    avatar: '',
    bio: '',
    idCardPhoto: '',
    name: ''
  },
  instructorId: '',
  learnerLimit: 0,
  learnerQuantity: 0,
  level: LEVEL.BASIC,
  media: [],
  price: 0,
  progress: {
    completed: 0,
    percentage: 0,
    total: 0
  },
  sessions: [],
  slotNumbers: [],
  startDate: '',
  status: CLASS_STATUS.PUBLISHED,
  thumbnail: '',
  title: '',
  type: [],
  updatedAt: '',
  weekdays: []
}

const ClassDetailScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { getClassDetail } = useClass()
  const [data, setData] = useState<IClassDetail>(defaultClassDetail)
  const { classId } = useLocalSearchParams()
  const [collapseSession, setCollapseSession] = useState(true)
  const [feedbackData, setFeedbackData] = useState<IPagination<IClassFeedbackListResponse> | null>(null)
  const { getClassFeedbackList } = useFeedback()
  const [openFeedback, setOpenFeedback] = useState(false)
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const [courseDetail, feedbackList] = await Promise.all([
        getClassDetail(classId as string),
        getClassFeedbackList(classId as string)
      ])
      if (courseDetail && typeof courseDetail !== 'string' && feedbackList && typeof feedbackList !== 'string') {
        const lastDates = calculateDateList(courseDetail.startDate, courseDetail.duration, courseDetail.weekdays)
        const lastSessionDate = dayjs(lastDates[1]).add(7, 'hour')
        setOpenFeedback(dayjs().startOf('day').add(7, 'hour').isSameOrAfter(lastSessionDate))
        setData(courseDetail)
        setFeedbackData(feedbackList)
      }
      setIsLoading(false)
    })()
  }, [classId, getClassDetail, getClassFeedbackList])

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
        <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1, backgroundColor: '#FFF' }}>
          <Overview
            media={data.media}
            duration={data.duration}
            sessionCount={data.sessions.length}
            level={data.level}
            learnerLimit={data.learnerLimit}
            title={data.title}
            courseTypes={data.type}
            instructorName={data.instructor.name}
          />
          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <View
              style={{
                gap: 7.5,
                marginHorizontal: 15
              }}
            >
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <MyText
                  text={data.code}
                  styleProps={{
                    fontFamily: myFontWeight.bold,
                    fontSize: 16,
                    alignSelf: 'flex-start'
                  }}
                />
                {data.status === CLASS_STATUS.PUBLISHED ? (
                  <Chip
                    label='Sắp bắt đầu'
                    backgroundColor={myTheme.yellow}
                    containerStyle={{ borderWidth: 0 }}
                    labelStyle={{ color: '#FFF', fontFamily: myFontWeight.bold, fontSize: 10, margin: -2.5 }}
                  />
                ) : undefined}
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Feather name='calendar' size={20} color={myTheme.grey} />
                <MyText
                  text={`Ngày bắt đầu: ${dayjs(data.startDate).format('DD/MM/YYYY')}`}
                  styleProps={{ color: myTextColor.caption }}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <Feather name='clock' size={20} color={myTheme.grey} />
                <MyText
                  text={`Thời gian học: ${data.weekdays.map((value) => extractWeekday(value)).join(', ')} • Tiết ${data.slotNumbers[0]}: ${extractSlot(data.slotNumbers[0]).slotStart} - ${extractSlot(data.slotNumbers[0]).slotEnd}`}
                  styleProps={{ color: myTextColor.caption }}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Feather name='map-pin' size={20} color={myTheme.grey} />
                <MyLink
                  href={{
                    pathname: '/(app)/(course)/garden-information/[gardenId]',
                    params: {
                      gardenId: data.gardenId,
                      title: data.garden.name
                    }
                  }}
                  text={data.garden.name}
                  styleProps={{ color: myTextColor.caption, textDecorationLine: 'underline' }}
                />
              </View>
            </View>
            <CourseDescription description={data.description} />
            <InstructorBio contactButton instructorInfo={data.instructor} classInfo={data} />
            <View style={{ marginBottom: 20, marginHorizontal: 15 }}>
              <TouchableOpacity
                onPress={() => setCollapseSession(!collapseSession)}
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
                <Entypo name={!collapseSession ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
              </TouchableOpacity>
              <Collapsible collapsed={collapseSession}>
                <SessionList
                  classStatus={data.status}
                  onPressHandleEvent
                  classId={classId as string}
                  sessionList={data.sessions}
                />
              </Collapsible>
            </View>
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
                      classId
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
                text='Lớp học này chưa có đánh giá'
                styleProps={{
                  color: myTextColor.caption,
                  alignSelf: 'center',
                  paddingBottom: 22.5,
                  paddingTop: 10
                }}
              />
            )}
          </View>
          {openFeedback ? (
            <Button
              backgroundColor={myTheme.primary}
              labelStyle={{ fontFamily: myFontWeight.semiBold }}
              style={{ marginBottom: 22.5 }}
              label='Viết nhận xét'
              onPress={() => setFeedbackModalVisible(true)}
            />
          ) : undefined}
          <FeedbackModal
            data={data}
            feedbackModalVisible={feedbackModalVisible}
            setFeedbackModalVisible={setFeedbackModalVisible}
          />
        </ScrollView>
        //
      )}
    </>
  )
}

export default ClassDetailScreen
