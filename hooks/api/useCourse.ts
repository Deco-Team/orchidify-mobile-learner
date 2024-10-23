import axios from 'axios'
import { useCallback } from 'react'

import useApi from './useApi'

import { ICourseDetail, ICourseListResponse } from '@/contracts/interfaces/course.interface'
import { errorMessage } from '@/contracts/messages'
import { CommonErrorResponse, IPagination } from '@/contracts/types'

const useCourse = () => {
  const callApi = useApi()

  const rootEndpoint = 'courses/'

  const getCourseList = useCallback(
    async ({
      title,
      type,
      level,
      page,
      limit,
      sort
    }: {
      title?: string
      type?: string
      level?: string[]
      page?: number
      limit?: number
      sort?: string
    }) => {
      try {
        const result = await callApi<IPagination<ICourseListResponse>>(
          'get',
          rootEndpoint,
          {},
          {
            title,
            type,
            level,
            page,
            limit,
            sort
          }
        )
        return result.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const response = error.response?.data as CommonErrorResponse
          return response.message
        } else {
          return errorMessage.ERM033
        }
      }
    },
    [callApi]
  )

  const getCourseDetail = useCallback(
    async (courseId: string) => {
      try {
        const result = await callApi<ICourseDetail>('get', `${rootEndpoint}${courseId}`)
        return result.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const response = error.response?.data as CommonErrorResponse
          return response.message
        } else {
          return errorMessage.ERM033
        }
      }
    },
    [callApi]
  )

  return { getCourseList, getCourseDetail }
}

export default useCourse
