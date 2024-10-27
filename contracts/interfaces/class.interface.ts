import { CLASS_STATUS, LEVEL } from '../constants'
import { IInstructor, IMedia } from './course.interface'

export interface IMomoResponse {
  partnerCode: string
  requestId: string
  orderId: string
  amount: number
  responseTime: number
  message: string
  resultCode: number
  payUrl: string
  shortLink: string
  deeplink: string
  qrCodeUrl: string
}

export interface IClass {
  _id: string
  code: string
  title: string
  level: LEVEL
  type: string[]
  thumbnail: string
  status: CLASS_STATUS
  instructor: {
    name: string
  }
  progress: {
    total: number
    completed: number
    percentage: number
  }
}

export interface IClassDetail {
  _id: string
  code: string
  title: string
  description: string
  startDate: string
  price: number
  level: LEVEL
  type: string[]
  duration: number
  thumbnail: string
  media: IMedia[]
  sessions: ISession[]
  status: CLASS_STATUS
  histories: {
    status: CLASS_STATUS
    timestamp: string
    userId: string
    userRole: string
  }[]
  learnerLimit: number
  learnerQuantity: number
  weekdays: string[]
  slotNumbers: number[]
  gardenRequiredToolkits: string
  instructorId: string
  gardenId: string
  courseId: string
  createdAt: string
  updatedAt: string
  progress: {
    total: number
    completed: number
    percentage: number
  }
  garden: {
    _id: string
    name: string
    id: string
  }
  instructor: IInstructor
  id: string
}

export interface ISession {
  _id: string
  sessionNumber: number
  title: string
  description: string
  media: IMedia[]
  assignments: IAssignment[]
}

export interface IAssignment {
  _id: string
  title: string
  description: string
  attachments: IMedia[]
}
