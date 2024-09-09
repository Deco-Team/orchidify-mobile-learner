import axios from 'axios'
import { useCallback } from 'react'

import useApi from './useApi'

import { IRegisterPayload } from '@/contracts/interfaces/register.interface'
import { errorMessage } from '@/contracts/messages'

const useUser = () => {
  const callApi = useApi()

  const rootEndpoint = 'auth/learner/'

  const register = useCallback(
    async (data: IRegisterPayload) => {
      try {
        await callApi('post', rootEndpoint + 'register', {}, {}, data)
        return true
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data.message
        } else {
          return errorMessage.ERM000
        }
      }
    },
    [callApi]
  )

  return { register }
}

export default useUser
