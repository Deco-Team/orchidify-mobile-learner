import { CLASS_STATUS, LEVEL, SLOT_NUMBER, WEEKDAY } from '../constants'
import { IInstructor, IMedia } from './course.interface'

export interface IStripeResponse {
  id: string
  paymentIntent: string
  ephemeralKey: string
  customer: string
  publishableKey: string
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
  hasSentFeedback: boolean
  learnerLimit: number
  learnerQuantity: number
  weekdays: WEEKDAY[]
  slotNumbers: SLOT_NUMBER[]
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
  submission: {
    _id: string
    attachments: IMedia[]
    assignmentId: string
    classId: string
    createdAt: string
    id: string
    learnerId: string
    status: string
    updatedAt: string
    point?: number
    feedback?: string
  } | null
  description: string
  attachments: IMedia[]
  sessionNumber?: number
  deadline?: string
  instructor: {
    _id: string
    name: string
    idCardPhoto: string
    avatar: string
  }
}

export interface IAssignmentSubmissionPayload {
  attachments: IMedia[]
  assignmentId: string
}
