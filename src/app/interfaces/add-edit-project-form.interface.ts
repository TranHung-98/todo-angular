import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IGeneralFormGroup {
  customerId: FormControl<number | null>,
  name: FormControl<string | null>,
  code: FormControl<string | null>,
  status: FormControl<number | null>,
  timeStart: FormControl<string | null>,
  timeEnd: FormControl<string | null>,
  note: FormControl<string | null>,
  isAllUserBelongTo: FormControl<boolean | null>,
  projectType: FormControl<number | null>,
}

export interface ITeamFormGroup {
  userId: FormControl<number | null>,
  type: FormControl<number | null>,
  isTemp: FormControl<boolean | null>,
}

export interface ITaskFormGroup {
  taskId: FormControl<number | null>,
  billable: FormControl<boolean | null>,
}

export interface ITargetUserFormGroup {
  userId: FormControl<number | null>,
  roleName: FormControl<string | null>,
}

export interface INotificationFormGroup {
  komuChannelId: FormControl<string | null>,
  isNotifyToKomu: FormControl<boolean | null>,
  isNoticeKMSubmitTS: FormControl<boolean | null>,
  isNoticeKMRequestOffDate: FormControl<boolean | null>,
  isNoticeKMApproveRequestOffDate: FormControl<boolean | null>,
  isNoticeKMRequestChangeWorkingTime: FormControl<boolean | null>,
  isNoticeKMApproveChangeWorkingTime: FormControl<boolean | null>
}
export interface INotification {
  komuChannelId: string,
  isNotifyToKomu: boolean,
  isNoticeKMSubmitTS: boolean,
  isNoticeKMRequestOffDate: boolean,
  isNoticeKMApproveRequestOffDate: boolean,
  isNoticeKMRequestChangeWorkingTime: boolean,
  isNoticeKMApproveChangeWorkingTime: boolean

}
export interface IProjectForm {
  generalForm: FormGroup<IGeneralFormGroup>,
  teamArrayForm: FormArray<FormGroup<ITeamFormGroup>>,
  tasksArrayForm: FormArray<FormGroup<ITaskFormGroup>>,
  targetUserArrayForm?: FormArray<FormGroup<ITargetUserFormGroup>>,
  notificationForm: FormGroup<INotificationFormGroup>
}
