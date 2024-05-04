export interface ILoginFormInterface {
  password: string | undefined | null;
  userNameOrEmailAddress: string | undefined | null;
  rememberClient: boolean | undefined | null;
}

export interface ILoginGoogleRequest {
  googleToken: string,
  secretCode: string
}

export interface ILoginResponse {
  accessToken: string,
  encryptedAccessToken: string,
  expireInSeconds: number,
  userId: number
}

export interface IBaseResponseError {
  code: number,
  message: string,
  details: string | null,
  validationErrors: object | null,
}

export interface IBaseResponse<T> {
  result: T,
  targetUrl: string | null,
  success: boolean,
  unAuthorizedRequest: boolean,
  __abp: boolean,
  error: IBaseResponseError | null,
}

export interface IApplication {
  version: string,
  releaseDate: string,
  features: {}
}

export interface tenant {
  tenancyName: string,
  name: string,
  id: number,
}

export interface ILoginInformations {
  user: IUserInfomation | null,
  application: IApplication,
  tenant: tenant | null
}

export interface IUserInfomation {
  name: string,
  surname: string,
  userName: string,
  emailAddress: string,
  allowedLeaveDay: number,
  type: number,
  level: number,
  sex: 0,
  branch: 0,
  avatarPath: string,
  avatarFullPath: string,
  morningWorking: string,
  morningStartAt: string,
  morningEndAt: string,
  afternoonWorking: string,
  afternoonStartAt: string,
  afternoonEndAt: string,
  isWorkingTimeDefault: true,
  branchId: number | null,
  id: 0
}
