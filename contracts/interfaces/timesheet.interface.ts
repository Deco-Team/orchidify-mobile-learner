import { ATTENDANCE_STATUS } from '../constants'

export interface ITimesheet {
  _id: string
  slotNumber: number
  start: string
  end: string
  classId: string
  metadata: {
    code: string
    title: string
    sessionNumber: number
    sessionTitle: string
  }
  hasTakenAttendance: boolean
  instructor: {
    _id: string
    name: string
  }
  garden: {
    _id: string
    name: string
  }
  attendance: {
    _id: string
    status: ATTENDANCE_STATUS
  }
  createdAt: string
  updatedAt: string
}
