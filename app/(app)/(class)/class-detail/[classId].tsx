import { Entypo, Feather } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Chip, LoaderScreen, View } from 'react-native-ui-lib'

import CourseDescription from '@/components/common/CourseDescription'
import InstructorBio from '@/components/common/InstructorBio'
import MyLink from '@/components/common/MyLink'
import MyText from '@/components/common/MyText'
import Overview from '@/components/common/Overview'
import SessionList from '@/components/course-detail/SessionList'
import { myTheme, myFontWeight, LEVEL, CLASS_STATUS, width, myTextColor } from '@/contracts/constants'
import { IClassDetail } from '@/contracts/interfaces/class.interface'
import useClass from '@/hooks/api/useClass'
import { extractSlot, extractWeekday } from '@/utils'

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
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const courseDetail = await getClassDetail(classId as string)
      if (courseDetail && typeof courseDetail !== 'string') {
        setData(courseDetail)
      }
      setIsLoading(false)
    })()
  }, [classId, getClassDetail])

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
          <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
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
                  <Chip
                    label='Sắp bắt đầu'
                    backgroundColor={myTheme.yellow}
                    containerStyle={{ borderWidth: 0 }}
                    labelStyle={{ color: '#FFF', fontFamily: myFontWeight.bold, fontSize: 10, margin: -2.5 }}
                  />
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
              <InstructorBio contactButton instructorInfo={data.instructor} />
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
                  <Entypo name={collapseSession ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
                </TouchableOpacity>
                <Collapsible collapsed={collapseSession}>
                  <SessionList onPressHandleEvent classId={classId as string} sessionList={data.sessions} />
                </Collapsible>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default ClassDetailScreen
