import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { LoaderScreen, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import RatingFilterButton from '@/components/course-detail/RatingFilterButton'
import RatingList from '@/components/course-detail/RatingList'
import RatingProgressBar from '@/components/rating/RatingProgressBar'
import { myFontWeight, myTheme } from '@/contracts/constants'
import { IClassDetail } from '@/contracts/interfaces/class.interface'
import { ICourseDetail } from '@/contracts/interfaces/course.interface'
import { IClassFeedbackListResponse, ICourseFeedbackListResponse } from '@/contracts/interfaces/feedback.interface'
import { IPagination } from '@/contracts/types'
import useClass from '@/hooks/api/useClass'
import useCourse from '@/hooks/api/useCourse'
import useFeedback from '@/hooks/api/useFeedback'

const RatingListScreen = () => {
  const [filterStatus, setFilterStatus] = useState<string>('Tất cả')
  const [feedbackData, setFeedbackData] = useState<
    IPagination<IClassFeedbackListResponse> | IPagination<ICourseFeedbackListResponse> | null
  >(null)
  const [feedbackStat, setFeedbackStat] = useState<ICourseDetail | IClassDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getCourseFeedbackList, getClassFeedbackList } = useFeedback()
  const { getCourseDetail } = useCourse()
  const { getClassDetail } = useClass()
  const { courseId, classId } = useLocalSearchParams()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (courseId) {
        const feedbackDetail = await getCourseDetail(courseId as string)
        if (feedbackDetail && typeof feedbackDetail !== 'string') {
          setFeedbackStat(feedbackDetail as unknown as ICourseDetail)
        }
      } else {
        const feedbackDetail = await getClassDetail(classId as string)
        if (feedbackDetail && typeof feedbackDetail !== 'string') {
          setFeedbackStat(feedbackDetail as unknown as IClassDetail)
        }
      }
      setIsLoading(false)
    })()
  }, [classId, courseId, getClassDetail, getCourseDetail])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (courseId) {
        const courseFeedback = await getCourseFeedbackList(
          courseId as string,
          filterStatus === 'Tất cả' ? undefined : filterStatus
        )
        if (courseFeedback && typeof courseFeedback !== 'string') {
          setFeedbackData(courseFeedback)
        }
      } else {
        const classFeedback = await getClassFeedbackList(
          classId as string,
          filterStatus === 'Tất cả' ? undefined : filterStatus
        )
        if (classFeedback && typeof classFeedback !== 'string') {
          setFeedbackData(classFeedback)
        }
      }
      setIsLoading(false)
    })()
  }, [courseId, classId, getCourseFeedbackList, getClassFeedbackList, filterStatus])

  const handleFilterRating = (label: string) => {
    setFilterStatus(label)
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
            <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }} style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', gap: 3, alignItems: 'baseline' }}>
                <MyText
                  text={feedbackStat?.ratingSummary?.totalSum.toString() || ''}
                  styleProps={{ fontFamily: myFontWeight.bold, fontSize: 50 }}
                />
                <MyText text='/5' styleProps={{ fontFamily: myFontWeight.bold, fontSize: 18 }} />
              </View>
              <StarRatingDisplay
                starSize={50}
                color={myTheme.yellow}
                starStyle={{ marginHorizontal: 0 }}
                rating={3.5}
              />
              <MyText
                text={`${feedbackStat?.ratingSummary?.totalCount.toString() || ''} đánh giá`}
                styleProps={{ fontSize: 18, marginVertical: 5 }}
              />
              <View>
                <RatingProgressBar
                  totalRating={feedbackStat?.ratingSummary?.totalCount || 1}
                  star={5}
                  numberOfRating={feedbackStat?.ratingSummary?.totalCountByRate[5] || 0}
                />
                <RatingProgressBar
                  totalRating={feedbackStat?.ratingSummary?.totalCount || 1}
                  star={4}
                  numberOfRating={feedbackStat?.ratingSummary?.totalCountByRate[4] || 0}
                />
                <RatingProgressBar
                  totalRating={feedbackStat?.ratingSummary?.totalCount || 1}
                  star={3}
                  numberOfRating={feedbackStat?.ratingSummary?.totalCountByRate[3] || 0}
                />
                <RatingProgressBar
                  totalRating={feedbackStat?.ratingSummary?.totalCount || 1}
                  star={2}
                  numberOfRating={feedbackStat?.ratingSummary?.totalCountByRate[2] || 0}
                />
                <RatingProgressBar
                  totalRating={feedbackStat?.ratingSummary?.totalCount || 1}
                  star={1}
                  numberOfRating={feedbackStat?.ratingSummary?.totalCountByRate[1] || 0}
                />
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 15, gap: 7.5 }}>
                <RatingFilterButton
                  onPress={() => handleFilterRating('Tất cả')}
                  isSelected={filterStatus.includes('Tất cả')}
                  text='Tất cả'
                />
                <RatingFilterButton
                  onPress={() => handleFilterRating('5')}
                  isSelected={filterStatus.includes('5')}
                  text='5'
                  star
                />
                <RatingFilterButton
                  onPress={() => handleFilterRating('4')}
                  isSelected={filterStatus.includes('4')}
                  text='4'
                  star
                />
                <RatingFilterButton
                  onPress={() => handleFilterRating('3')}
                  isSelected={filterStatus.includes('3')}
                  text='3'
                  star
                />
                <RatingFilterButton
                  onPress={() => handleFilterRating('2')}
                  isSelected={filterStatus.includes('2')}
                  text='2'
                  star
                />
                <RatingFilterButton
                  onPress={() => handleFilterRating('1')}
                  isSelected={filterStatus.includes('1')}
                  text='1'
                  star
                />
              </View>
              <RatingList feedbackList={feedbackData?.docs || []} />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default RatingListScreen
