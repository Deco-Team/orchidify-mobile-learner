import { useCallback } from 'react'

import useApi from './useApi'

import { ITimesheet } from '@/contracts/interfaces/timesheet.interface'
import { resolveError } from '@/utils'

const useTimesheet = () => {
  const callApi = useApi()

  const rootEndpoint = 'garden-timesheets/learner/my-timesheet'

  const getMyTimesheet = useCallback(
    async (date: string) => {
      try {
        const result = await callApi<{ docs: ITimesheet[] }>('get', `${rootEndpoint}?date=${date}&type=WEEK`)
        return result.data?.docs
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { getMyTimesheet }
}

export default useTimesheet
