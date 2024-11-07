import { useCallback } from 'react'

import useApi from './useApi'

import { ICourseDetail, ICourseListResponse } from '@/contracts/interfaces/course.interface'
import { IPagination } from '@/contracts/types'
import { resolveError } from '@/utils'

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
        return resolveError(error)
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
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { getCourseList, getCourseDetail }
}

export default useCourse
