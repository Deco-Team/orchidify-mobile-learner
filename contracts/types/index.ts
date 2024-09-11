export type CommonResponse<T> = {
  success: boolean
  data?: T
}
export type CommonErrorResponse = {
  error?: string
  message?: string
}
