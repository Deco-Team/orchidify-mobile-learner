import { useCallback } from 'react'

import useApi from './useApi'

import { IEditUserPayload, IUser } from '@/contracts/interfaces/user.interface'
import { resolveError } from '@/utils'

const useUser = () => {
  const callApi = useApi()

  const rootEndpoint = 'learners/profile'

  const getProfile = useCallback(async () => {
    try {
      const result = await callApi<IUser>('get', rootEndpoint)
      return result.data
    } catch (error) {
      resolveError(error)
    }
  }, [callApi])

  const editProfile = useCallback(
    async (data: IEditUserPayload) => {
      try {
        const result = await callApi<{ success: boolean }>('put', rootEndpoint, {}, {}, data)
        return result.data?.success
      } catch (error) {
        resolveError(error)
      }
    },
    [callApi]
  )

  return { getProfile, editProfile }
}

export default useUser
