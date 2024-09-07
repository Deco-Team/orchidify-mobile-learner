export interface IUser {
  role: string
  iat: number
  exp: number
  name: string
  sub: string
}

export interface ILoginPayload {
  email: string
  password: string
}
