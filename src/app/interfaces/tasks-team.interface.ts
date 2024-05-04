export interface ITaskOrTeamRequest {
  projectId: number,
  startDate: string,
  endDate: string
}

export interface ITaskResponse {
  taskId: number,
  taskName: string,
  totalWorkingTime: number,
  billableWorkingTime: number,
  billable: boolean
}
export interface IUserResponse {
  userId: number,
  userName: string,
  projectUserType: number,
  totalWorkingTime: number,
  billableWorkingTime: number
}
