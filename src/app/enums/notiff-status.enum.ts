export enum ENotifyResponseApi {
  GetApiFail = 'Get api failed!',
  AddSuccess = 'Add todo successfully !',
  EditSuccess = 'Update todo successfully !',
  DeleteSuccess = 'Delete todo successfully !',
  AddFail = 'Add todo fail !',
  EditFail = 'Update todo fail !',
  DeleteFail = 'Delete todo fail !',
  DeadlineWarning = 'The deadline has come !',
  DeadlineError = 'Expired !',
}

export enum EStatusEnum {
  Status = '',
  All = '0',
  Completed = '1',
  NotStarted = '2',
  InProgress = '3',
}
