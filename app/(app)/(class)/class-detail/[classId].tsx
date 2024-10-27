import { Entypo } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Collapsible from 'react-native-collapsible'
import { LoaderScreen, View } from 'react-native-ui-lib'

import CourseDescription from '@/components/common/CourseDescription'
import InstructorBio from '@/components/common/InstructorBio'
import MyText from '@/components/common/MyText'
import Overview from '@/components/common/Overview'
import SessonList from '@/components/course-detail/SessonList'
import { myTheme, myFontWeight, LEVEL, CLASS_STATUS, width } from '@/contracts/constants'
import { IClassDetail } from '@/contracts/interfaces/class.interface'
import useClass from '@/hooks/api/useClass'

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
  const [collapseSesson, setCollapseSesson] = useState(true)

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
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }} style={{ flex: 1 }}>
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
              <View style={{ paddingHorizontal: 15 }}>
                <CourseDescription description={data.description} />
                <InstructorBio contactButton instructorInfo={data.instructor} />
                <View style={{ marginBottom: 20 }}>
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
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default ClassDetailScreen
