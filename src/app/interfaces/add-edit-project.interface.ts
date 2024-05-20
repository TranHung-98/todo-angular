export interface ITasksResponse {
  name: string,
  type: number,
  isDeleted: boolean,
  id: number
}

export interface IUserTeamProjectRequest {
  userId: number,
  type: number,
  isTemp: boolean
}

export interface IUserTeamProjectResponse {
  userId: number,
  type: number,
  isTemp: boolean,
}

export interface ITaskProject {
  taskId: number,
  billable: boolean,
}

export interface IUserNotPaddingResponse {
  name: string,
  emailAddress: string,
  isActive: true,
  type: number,
  jobTitle: string,
  level: number,
  userCode: string,
  avatarPath: string,
  avatarFullPath: string,
  branch: number,
  branchColor: string,
  branchDisplayName: string,
  branchId: number,
  positionId: number,
  positionName: string,
  id: number
}

export interface ICustomerResponse {
  name: string,
  code: string,
  id: number
}

export interface IBranchesResponse {
  name: string,
  displayName: string,
  id: number
}

export interface ICustomerSaveRequest {
  name: string,
  address: string,
  code: string
}

export interface ICustomerSaveResponse {
  name: string,
  address: string,
  code: number,
  id: number
}

export interface IProjectTargetUsersRequest {
  userId: number,
  roleName: string
}

export interface IProjectTargetUsersResponse {
  userId: number,
  roleName: string,
}
export interface IAddOrEditProjectRequest {
  customerId: number,
  name: string,
  code: string,
  timeStart: string | null,
  timeEnd: string | null,
  projectType: number,
  note: string,
  users: IUserTeamProjectResponse[],
  projectTargetUsers: IProjectTargetUsersResponse[],
  tasks: ITaskProject[],
  komuChannelId: string,
  isNotifyToKomu: boolean,
  isNoticeKMSubmitTS: boolean,
  isNoticeKMRequestOffDate: boolean,
  isNoticeKMApproveRequestOffDate: boolean,
  isNoticeKMRequestChangeWorkingTime: boolean,
  isNoticeKMApproveChangeWorkingTime: boolean,
  isAllUserBelongTo: boolean,
}

export interface IAddOrEditProjectResponse {
  customerId: number,
  name: string,
  code: string,
  timeStart: string,
  timeEnd: string,
  projectType: number,
  users: IUserTeamProjectResponse[],
  tasks: ITaskProject[],
  note: string,
  projectTargetUsers: IProjectTargetUsersResponse[],
  komuChannelId: string,
  isNotifyToKomu: boolean,
  isNoticeKMSubmitTS: boolean,
  isNoticeKMRequestOffDate: boolean,
  isNoticeKMApproveRequestOffDate: boolean,
  isNoticeKMRequestChangeWorkingTime: boolean,
  isNoticeKMApproveChangeWorkingTime: boolean,
  isAllUserBelongTo: boolean,
  id: number
}
