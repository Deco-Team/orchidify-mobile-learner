import { useCallback } from 'react'

import useApi from './useApi'

import { IRegisterPayload, IResendOtpPayload, IVerifyOtpPayload } from '@/contracts/interfaces/register.interface'
import { resolveError } from '@/utils'

const useAuth = () => {
  const callApi = useApi()

  const rootEndpoint = 'auth/learner/'

  const register = useCallback(
    async (data: IRegisterPayload) => {
      try {
        await callApi('post', rootEndpoint + 'register', {}, {}, data)
        return true
      } catch (error) {
        return resolveError(error)
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
        return resolveError(error)
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
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { register, verifyOtp, resendOtp }
}

export default useAuth
