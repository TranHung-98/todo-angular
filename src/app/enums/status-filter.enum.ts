export enum EStatusFilter {
  ALL = 'All Projects',
  ACTIVE = 'Active Projects',
  INACTIVE = 'Deactive Projects'
}

export enum EStatusFilterQueryParams {
  ALL = '',
  ACTIVE = '0',
  INACTIVE = '1'
}

export enum EStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  SHADOW = 2,
  PM = ACTIVE,
  DEACTIVE = 3,
  MEMBER = INACTIVE,
}

export enum EStatusSelect {
  ALL = 'All',
  ACTIVE = 'Active',
  INACTIVE = 'InActice'
}

export enum EIndex {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}
