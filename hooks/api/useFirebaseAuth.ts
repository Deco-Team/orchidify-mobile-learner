import { useCallback } from 'react'

import useApi from './useApi'

import { resolveError } from '@/utils'

const useFirebaseAuth = () => {
  const callApi = useApi()

  const rootEndpoint = 'firebase/custom-token/'

  const createCustomToken = useCallback(async () => {
    try {
      const result = await callApi<{ token: string }>('post', rootEndpoint)
      return result.data
    } catch (error) {
      return resolveError(error)
    }
  }, [callApi])

  return {
    createCustomToken
  }
}

export default useFirebaseAuth
