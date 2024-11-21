export interface IClassFeedbackListResponse {
  _id: string
  rate: number
  comment: string
  learnerId: string
  classId: string
  createdAt: string
  updatedAt: string
  learner: ILearner
}
export interface ICourseFeedbackListResponse {
  _id: string
  rate: number
  comment: string
  learnerId: string
  classId: string
  createdAt: string
  updatedAt: string
  learner: ILearner
}

export interface ILearner {
  email: string
  _id: string
  name: string
  avatar: string
  dateOfBirth: string
  phone: string
}
