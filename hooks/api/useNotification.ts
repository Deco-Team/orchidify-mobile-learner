import { useCallback } from 'react'

import useApi from './useApi'

import { resolveError } from '@/utils'

interface RegisterUserDeviceRequest {
  fcmToken: string
  browser: string
  os: string
}

const useNotification = () => {
  const callApi = useApi()

  const rootEndpoint = 'notifications/user-devices/'

  const registerUserDevice = useCallback(
    async (request: RegisterUserDeviceRequest) => {
      try {
        const result = await callApi<{ success: boolean }>('post', rootEndpoint, {}, {}, request)
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { registerUserDevice }
}

export default useNotification
