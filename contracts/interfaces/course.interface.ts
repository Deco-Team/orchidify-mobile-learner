import { CLASS_STATUS, COURSE_STATUS, LEVEL, SLOT_NUMBER, WEEKDAY } from '../constants'
import { IMedia } from './index.interface'

export interface ICourseListResponse {
  _id: string
  code: string
  finalPrice: number
  title: string
  price: number
  level: string
  type: string[]
  duration: number
  thumbnail: string
  status: COURSE_STATUS
  learnerLimit: number
  rate: number
  discount: number
  ratingSummary: {
    totalSum: number
    totalCount: number
    totalCountByRate: {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
    }
  }
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
  price: number
  level: LEVEL
  type: string[]
  duration: number
  thumbnail: string
  ratingSummary?: {
    totalSum: number
    totalCount: number
    totalCountByRate: {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
    }
  }
  finalPrice: number
  media: IMedia[]
  status: COURSE_STATUS
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
  learnerClass: null
}

export interface IInstructor {
  _id: string
  name: string
  bio: string
  idCardPhoto: string
  avatar: string
}

export interface IClass {
  _id: string
  code: string
  title: string
  startDate: string
  duration: number
  status: CLASS_STATUS
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
  } | null
}

export interface ICourseType {
  groupName: string
  groupItems: string[]
}

export { IMedia }
