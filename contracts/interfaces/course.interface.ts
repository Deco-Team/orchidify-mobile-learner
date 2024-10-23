import { LEVEL, SLOT_NUMBER, WEEKDAY } from '../constants'

export interface ICourseListResponse {
  _id: string
  code: string
  title: string
  price: number
  level: string
  type: string[]
  duration: number
  thumbnail: string
  status: string
  learnerLimit: number
  rate: number
  discount: number
  instructorId: string
  isPublished: true
  createdAt: string
  updatedAt: string
  instructor: {
    _id: string
    name: string
    bio: string
    idCardPhoto: string
    avatar: string
  }
  classesCount: number
}

export interface ICourseDetail {
  _id: string
  code: string
  title: string
  description: string
  price: 500000
  level: LEVEL
  type: string[]
  duration: number
  thumbnail: string
  media: IMedia[]
  status: string
  sessions: {
    _id: string
    title: string
  }[]
  learnerLimit: number
  rate: number
  discount: number
  gardenRequiredToolkits: string
  instructorId: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  instructor: IInstructor
  classes: IClass[]
}

export interface IInstructor {
  _id: string
  name: string
  bio: string
  idCardPhoto: string
  avatar: string
}

export interface IMedia {
  asset_id: string
  public_id: string
  format: string
  resource_type: string
  created_at: string
  type: string
  url: string
  asset_folder: string
  original_filename: string
  original_extension: string
}

export interface IClass {
  _id: string
  code: string
  title: string
  startDate: string
  duration: number
  status: string
  learnerLimit: number
  learnerQuantity: number
  weekdays: WEEKDAY[]
  slotNumbers: SLOT_NUMBER[]
  gardenId: string
  garden: {
    _id: string
    name: string
  }
  learnerClass: {
    _id: string
  }
}

export interface ICourseType {
  groupName: string
  groupItems: string[]
}
