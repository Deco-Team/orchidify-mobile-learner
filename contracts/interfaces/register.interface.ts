export interface IRegisterFormPayload extends IRegisterPayload {
  passwordConfirmation: string
}

export interface IRegisterPayload {
  email: string
  name: string
  password: string
}

export interface IResendOtpPayload {
  email: string
}

export interface IVerifyOtpPayload extends IResendOtpPayload {
  code: string
}
