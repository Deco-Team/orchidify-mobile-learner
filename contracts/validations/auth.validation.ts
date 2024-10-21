import * as yup from 'yup'

import { errorMessage } from '@/contracts/messages'
import { extractMessage } from '@/utils'

export const authSchema = yup.object().shape({
  email: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Email']))
    .email(errorMessage.ERM018)
    .max(50, extractMessage(errorMessage.ERM009, ['Email', '50'])),
  password: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Mật khẩu']))
    .min(8, extractMessage(errorMessage.ERM020, ['Mật khẩu', '8']))
    .max(50, extractMessage(errorMessage.ERM009, ['Mật khẩu', '50']))
})

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Email']))
    .email(errorMessage.ERM018)
    .max(50, extractMessage(errorMessage.ERM009, ['Email', '50'])),

  password: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Mật khẩu']))
    .min(8, extractMessage(errorMessage.ERM020, ['Mật khẩu', '8']))
    .max(50, extractMessage(errorMessage.ERM009, ['Mật khẩu', '50']))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g, errorMessage.ERM021),

  passwordConfirmation: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Xác nhận mật khẩu']))
    .oneOf([yup.ref('password')], errorMessage.ERM030),

  name: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Họ và tên']))
    .max(50, extractMessage(errorMessage.ERM009, ['Họ và tên', '50']))
})
