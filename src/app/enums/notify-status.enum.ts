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
  LoginSuccess = 'Login successfully!'
}

export enum EStatusEnum {
  Status = '',
  Active = '1',
  Failed = '3',
  InProgress = '2',
}
