import { useCallback } from 'react'

import useApi from './useApi'

import { IGardenDetail } from '@/contracts/interfaces/garden.interface'
import { resolveError } from '@/utils'

const useGarden = () => {
  const callApi = useApi()

  const rootEndpoint = 'gardens/learner/'

  const getGardenDetail = useCallback(
    async (gardenId: string) => {
      try {
        const result = await callApi<IGardenDetail>('get', `${rootEndpoint}${gardenId}`)
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { getGardenDetail }
}

export default useGarden
