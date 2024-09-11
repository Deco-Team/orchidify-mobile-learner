import axios from 'axios'
import { useCallback } from 'react'

import useApi from './useApi'

import { IRegisterPayload, IResendOtpPayload, IVerifyOtpPayload } from '@/contracts/interfaces/register.interface'
import { errorMessage } from '@/contracts/messages'
import { CommonErrorResponse, CommonResponse } from '@/contracts/types'

const useUser = () => {
  const callApi = useApi()

  const rootEndpoint = 'auth/learner/'

  const register = useCallback(
    async (data: IRegisterPayload) => {
      try {
        await callApi<CommonResponse<undefined>>('post', rootEndpoint + 'register', {}, {}, data)
        return true
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const response = error.response?.data as CommonErrorResponse
          return response.message
        } else {
          return errorMessage.ERM000
        }
      }
    },
    [callApi]
  )

  const verifyOtp = useCallback(
    async (data: IVerifyOtpPayload) => {
      try {
        await callApi('post', rootEndpoint + 'verify-otp', {}, {}, data)
        return true
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const response = error.response?.data as CommonErrorResponse
          return response.message
        } else {
          return errorMessage.ERM000
        }
      }
    },
    [callApi]
  )

  const resendOtp = useCallback(
    async (data: IResendOtpPayload) => {
      try {
        await callApi('post', rootEndpoint + 'resend-otp', {}, {}, data)
        return true
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const response = error.response?.data as CommonErrorResponse
          return response.message
        } else {
          return errorMessage.ERM000
        }
      }
    },
    [callApi]
  )

  return { register, verifyOtp, resendOtp }
}

export default useUser
