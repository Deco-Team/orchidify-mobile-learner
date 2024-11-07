import { useCallback } from 'react'

import useApi from './useApi'

import { IInstructorDetail } from '@/contracts/interfaces/instructor.interface'
import { resolveError } from '@/utils'

const useInstructor = () => {
  const callApi = useApi()

  const rootEndpoint = 'instructors/learner/'

  const getInstructorDetail = useCallback(
    async (instructorId: string) => {
      try {
        const result = await callApi<IInstructorDetail>('get', `${rootEndpoint}${instructorId}`)
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { getInstructorDetail }
}

export default useInstructor
