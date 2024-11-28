import { useCallback } from 'react'

import useApi from './useApi'

import { IMedia } from '@/contracts/interfaces/index.interface'
import { IBase64Request } from '@/contracts/interfaces/media.interface'
import { resolveError } from '@/utils'

const useMedia = () => {
  const callApi = useApi()

  const rootEndpoint = 'media/'

  const uploadViaBase64 = useCallback(
    async (data: IBase64Request) => {
      try {
        const result = await callApi<IMedia>('post', rootEndpoint + 'upload/base64', {}, {}, data)
        return result.data
      } catch (error) {
        return resolveError(error)
      }
    },
    [callApi]
  )

  return { uploadViaBase64 }
}

export default useMedia
