
export interface IProjectFilterParams {
  status: string,
  search: string
}

export interface IQuantityProjectResponse {
  quantity: number,
  status: number
}

export interface IProjectResponse {
  customerName: string,
  name: string,
  code: string,
  status: number,
  pms: string[],
  activeMember: number,
  projectType: number,
  timeStart: Date,
  timeEnd: Date,
  id: number
}

export interface IProjectType {
  projectType: number,
  nameType: string
}
