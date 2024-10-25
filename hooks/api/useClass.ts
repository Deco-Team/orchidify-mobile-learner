import axios from 'axios'
import { useCallback } from 'react'

import useApi from './useApi'

import { IClass, IClassDetail, IMomoResponse } from '@/contracts/interfaces/class.interface'
import { errorMessage } from '@/contracts/messages'
import { CommonErrorResponse, IPagination } from '@/contracts/types'

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
      sort?: string[]
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

  const getClassDetail = useCallback(
    async (classId: string) => {
      try {
        const result = await callApi<IClassDetail>('get', `${rootEndpoint}my-classes/${classId}`)
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

  return { enrolClass, getClassDetail, getClassList }
}

export default useClass
