import { useCallback } from 'react'

import useApi from './useApi'

import { IClass, IClassDetail, IMomoResponse } from '@/contracts/interfaces/class.interface'
import { IPagination } from '@/contracts/types'
import { resolveError } from '@/utils'

const useClass = () => {
  const callApi = useApi()

  const rootEndpoint = 'classes/learner/'

  const enrolClass = useCallback(
    async (classId: string) => {
      try {
        const result = await callApi<IMomoResponse>(
          'post',
          `${rootEndpoint}enroll/${classId}`,
          {},
          {},
          {
            requestType: 'captureWallet'
          }
        )
        return result.data
      } catch (error) {
        resolveError(error)
      }
    },
    [callApi]
  )

  const getClassList = useCallback(
    async ({
      type,
      level,
      sort,
      status,
      title
    }: {
      title?: string
      type?: string
      level?: string[]
      status?: string[]
      sort?: string
    }) => {
      try {
        const result = await callApi<IPagination<IClass>>(
          'get',
          `${rootEndpoint}my-classes`,
          {},
          {
            type,
            level,
            sort,
            status,
            title
          }
        )
        return result.data
      } catch (error) {
        resolveError(error)
      }
    },
    [callApi]
  )

  const getClassDetail = useCallback(
    async (classId: string) => {
      try {
        const result = await callApi<IClassDetail>('get', `${rootEndpoint}my-classes/${classId}`)
        return result.data
      } catch (error) {
        resolveError(error)
      }
    },
    [callApi]
  )

  const getAssignmentDetail = useCallback(
    async (assignmentId: string) => {
      try {
        const result = await callApi<IClassDetail>('get', `${rootEndpoint}my-classes/assignments/${assignmentId}`)
        return result.data
      } catch (error) {
        resolveError(error)
      }
    },
    [callApi]
  )

  const getSessionDetail = useCallback(
    async (sessionId: string) => {
      try {
        const result = await callApi<IClassDetail>('get', `${rootEndpoint}my-classes/sessions/${sessionId}`)
        return result.data
      } catch (error) {
        resolveError(error)
      }
    },
    [callApi]
  )

  return { enrolClass, getClassDetail, getClassList, getAssignmentDetail, getSessionDetail }
}

export default useClass
