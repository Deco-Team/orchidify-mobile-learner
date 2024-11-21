import { useCallback } from 'react'

import useApi from './useApi'

import { IClassFeedbackListResponse, ICourseFeedbackListResponse } from '@/contracts/interfaces/feedback.interface'
import { IPagination } from '@/contracts/types'
import { resolveError } from '@/utils'

const useFeedback = () => {
  const callApi = useApi()

  const rootEndpoint = 'feedbacks/learner/'

  const getClassFeedbackList = useCallback(
    async (classId: string, rate?: string, page?: number, limit?: number, sort?: string) => {
      try {
        const result = await callApi<IPagination<IClassFeedbackListResponse>>(
          'get',
          `${rootEndpoint}classes/${classId}`,
          {},
          {
            rate,
            page,
            limit,
            sort
          }
        )
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  const getCourseFeedbackList = useCallback(
    async (courseId: string, rate?: string) => {
      try {
        const result = await callApi<IPagination<ICourseFeedbackListResponse>>(
          'get',
          `${rootEndpoint}courses/${courseId}`,
          {},
          {
            rate
          }
        )
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  const sendFeedback = useCallback(
    async (classId: string, feedbackPayload: { rate: number; comment: string }) => {
      try {
        await callApi(
          'post',
          `${rootEndpoint}${classId}`,
          {},
          {},
          {
            rate: feedbackPayload.rate,
            comment: feedbackPayload.comment
          }
        )
        return true
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { getClassFeedbackList, getCourseFeedbackList, sendFeedback }
}

export default useFeedback
