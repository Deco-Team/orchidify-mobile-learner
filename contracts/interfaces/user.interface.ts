import { LEARNER_STATUS } from '../constants'

export interface IUser extends IEditUserPayload {
  email: string
  _id: string
  status: LEARNER_STATUS
}

export interface IEditUserPayload {
  name?: string
  avatar?: string
  dateOfBirth?: Date
  phone?: string
}
