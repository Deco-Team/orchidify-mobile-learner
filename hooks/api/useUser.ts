import axios from 'axios'
import { useCallback } from 'react'

import useApi from './useApi'

import { IEditUserPayload, IUser } from '@/contracts/interfaces/user.interface'
import { errorMessage } from '@/contracts/messages'
import { CommonErrorResponse } from '@/contracts/types'

const useUser = () => {
  const callApi = useApi()

  const rootEndpoint = 'learners/profile'

  const getProfile = useCallback(async () => {
    try {
      const result = await callApi<IUser>('get', rootEndpoint)
      return result.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response?.data as CommonErrorResponse
        return response.message
      } else {
        return errorMessage.ERM033
      }
    }
  }, [callApi])

  const editProfile = useCallback(
    async (data: IEditUserPayload) => {
      try {
        const result = await callApi<{ success: boolean }>('put', rootEndpoint, {}, {}, data)
        return result.data?.success
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

  return { getProfile, editProfile }
}

export default useUser
