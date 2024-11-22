import { useCallback } from 'react'

import useApi from './useApi'

import { ICertificate } from '@/contracts/interfaces/certificate.interface'
import { IPagination } from '@/contracts/types'
import { resolveError } from '@/utils'

const useCertificate = () => {
  const callApi = useApi()

  const rootEndpoint = 'certificates/learners/'

  const getCertificationList = useCallback(
    async ({ page, limit, sort }: { page?: number; limit?: number; sort?: string }) => {
      try {
        const result = await callApi<IPagination<ICertificate>>(
          'get',
          rootEndpoint,
          {},
          {
            page,
            sort,
            limit
          },
          {}
        )
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )
  const getCertificationDetail = useCallback(
    async (certificateId: string) => {
      try {
        const result = await callApi<ICertificate>('get', `${rootEndpoint}${certificateId}`, {}, {}, {})
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { getCertificationDetail, getCertificationList }
}

export default useCertificate
