import * as yup from 'yup'

import { errorMessage } from '../messages'

import { extractMessage } from '@/utils'

export const userSchema = yup.object().shape({
  phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, errorMessage.ERM023),
  dateOfBirth: yup.date(),
  name: yup.string().max(50, extractMessage(errorMessage.ERM009, ['Họ và tên', '50'])),
  avatar: yup.string().url()
})
