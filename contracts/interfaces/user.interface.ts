export interface IUser extends IEditUserPayload {
  email: string
  _id: string
  status: string
}

export interface IEditUserPayload {
  name?: string
  avatar?: string
  dateOfBirth?: Date
  phone?: string
}
