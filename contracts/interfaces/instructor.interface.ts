export interface IInstructorDetail {
  email: string
  _id: string
  name: string
  phone: string
  dateOfBirth: string
  certificates: {
    name: string
    url: string
  }[]
  bio: string
  idCardPhoto: string
  avatar: string
  status: string
  createdAt: string
  updatedAt: string
}
