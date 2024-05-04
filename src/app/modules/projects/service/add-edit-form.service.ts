import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGeneralFormGroup, INotificationFormGroup, IProjectForm, ITargetUserFormGroup, ITaskFormGroup, ITeamFormGroup } from 'src/app/interfaces/add-edit-project-form.interface';
import { IAddOrEditProjectRequest, IAddOrEditProjectResponse, IProjectTargetUsersResponse, ITaskProject, IUserTeamProjectResponse } from 'src/app/interfaces/add-edit-project.interface';

@Injectable()
export class AddEditFormService {

  constructor(private fb: FormBuilder) { }

  projectEdit: IAddOrEditProjectResponse | undefined;
  projectForm!: FormGroup<IProjectForm>;

  buildProjectForm(project?: IAddOrEditProjectResponse) {
    this.projectEdit = project;
    this.projectForm = this.fb.group<IProjectForm>({
      generalForm: this.createGeneralForm(),
      teamArrayForm: this.createTeamArrayForm(),
      tasksArrayForm: this.createTasksArrayForm(),
      targetUserArrayForm: this.createTargetUserArrayForm(),
      notificationForm: this.createNotificationForm()
    });
  }

  private createGeneralForm(): FormGroup<IGeneralFormGroup> {
    return this.fb.group<IGeneralFormGroup>({
      customerId: this.fb.control(this.projectEdit?.customerId ?? 0, Validators.required),
      name: this.fb.control<string>(this.projectEdit?.name ?? '', Validators.required),
      code: this.fb.control<string>(this.projectEdit?.code ?? '', Validators.required),
      status: this.fb.control<number>(this.projectEdit?.status ?? 0),
      timeStart: this.fb.control<string>(this.projectEdit?.timeStart ?? ''),
      timeEnd: this.fb.control<string>(this.projectEdit?.timeEnd ?? ''),
      note: this.fb.control<string>(this.projectEdit?.note ?? ''),
      isAllUserBelongTo: this.fb.control<boolean>(this.projectEdit?.isAllUserBelongTo ?? false),
      projectType: this.fb.control<number>(this.projectEdit?.projectType ?? 0)
    });
  }

  private createTeamArrayForm(): FormArray<FormGroup<ITeamFormGroup>> {
    if (this.projectEdit) {
      return this.fb.array<FormGroup<ITeamFormGroup>>(this.projectEdit?.users.map(user => {
        return this.fb.group<ITeamFormGroup>({
          userId: this.fb.control<number>(user.userId ?? 0),
          type: this.fb.control<number>(user.type ?? 0),
          isTemp: this.fb.control<boolean>(user.isTemp ?? false),
        });
      }));
    }
    else
      return this.fb.array<FormGroup<ITeamFormGroup>>([]);
  }

  private createTasksArrayForm(): FormArray<FormGroup<ITaskFormGroup>> {
    if (this.projectEdit) {
      return this.fb.array<FormGroup<ITaskFormGroup>>(this.projectEdit?.tasks.map(task => {
        return this.fb.group<ITaskFormGroup>({
          taskId: this.fb.control<number>(task.taskId),
          billable: this.fb.control<boolean>(task.billable),
        });
      }));
    }
    else
      return this.fb.array<FormGroup<ITaskFormGroup>>([]);
  }

  private createTargetUserArrayForm(): FormArray<FormGroup<ITargetUserFormGroup>> {
    if (this.projectEdit) {
      return this.fb.array<FormGroup<ITargetUserFormGroup>>(this.projectEdit?.projectTargetUsers.map(user => {
        return this.fb.group<ITargetUserFormGroup>({
          userId: this.fb.control<number>(user.userId),
          roleName: this.fb.control<string>(user.roleName),
        });
      }));
    } else {
      return this.fb.array<FormGroup<ITargetUserFormGroup>>([]);
    }
  }

  private createNotificationForm(): FormGroup<INotificationFormGroup> {
    return this.fb.group<INotificationFormGroup>({
      komuChannelId: this.fb.control<string>(this.projectEdit?.komuChannelId || ''),
      isNotifyToKomu: this.fb.control<boolean>(this.projectEdit?.isNotifyToKomu || false),
      isNoticeKMSubmitTS: this.fb.control<boolean>(this.projectEdit?.isNoticeKMSubmitTS || false),
      isNoticeKMRequestOffDate: this.fb.control<boolean>(this.projectEdit?.isNoticeKMRequestOffDate || false),
      isNoticeKMApproveRequestOffDate: this.fb.control<boolean>(this.projectEdit?.isNoticeKMApproveRequestOffDate || false),
      isNoticeKMRequestChangeWorkingTime: this.fb.control<boolean>(this.projectEdit?.isNoticeKMRequestChangeWorkingTime || false),
      isNoticeKMApproveChangeWorkingTime: this.fb.control<boolean>(this.projectEdit?.isNoticeKMApproveChangeWorkingTime || false)
    });
  }

  getValueProjectForm(): IAddOrEditProjectRequest | IAddOrEditProjectResponse {
    const generalFormValue = this.projectForm!.get('generalForm')!.value;
    const teamArrayFormValue = this.projectForm!.get('teamArrayForm')!.value || [];
    const tasksArrayFormValue = this.projectForm!.get('tasksArrayForm')!.value || [];
    const targetUserArrayFormValue = this.projectForm!.get('targetUserArrayForm')!.value || [];
    const notificationFormValue = this.projectForm!.get('notificationForm')!.value;
    const projectValue = {
      customerId: generalFormValue.customerId !== null ? generalFormValue.customerId : 0,
      name: generalFormValue.name !== null ? generalFormValue.name : '',
      code: generalFormValue.code !== null ? generalFormValue.code : '',
      status: generalFormValue.status !== null ? generalFormValue.status : 0,
      timeStart: generalFormValue.timeStart !== null ? generalFormValue.timeStart : '',
      timeEnd: generalFormValue.timeEnd !== null ? generalFormValue.timeEnd : '',
      projectType: generalFormValue.projectType !== null ? generalFormValue.projectType : 0,
      note: generalFormValue.note !== null ? generalFormValue.note : '',
      users: teamArrayFormValue as IUserTeamProjectResponse[],
      projectTargetUsers: targetUserArrayFormValue as IProjectTargetUsersResponse[],
      tasks: tasksArrayFormValue as ITaskProject[],
      komuChannelId: notificationFormValue.komuChannelId !== null ? notificationFormValue.komuChannelId : '',
      isNotifyToKomu: notificationFormValue.isNotifyToKomu !== null ? notificationFormValue.isNotifyToKomu : false,
      isNoticeKMSubmitTS: notificationFormValue.isNoticeKMSubmitTS !== null ? notificationFormValue.isNoticeKMSubmitTS : false,
      isNoticeKMRequestOffDate: notificationFormValue.isNoticeKMRequestOffDate !== null ? notificationFormValue.isNoticeKMRequestOffDate : false,
      isNoticeKMApproveRequestOffDate: notificationFormValue.isNoticeKMApproveRequestOffDate !== null ? notificationFormValue.isNoticeKMApproveRequestOffDate : false,
      isNoticeKMRequestChangeWorkingTime: notificationFormValue.isNoticeKMRequestChangeWorkingTime !== null ? notificationFormValue.isNoticeKMRequestChangeWorkingTime : false,
      isNoticeKMApproveChangeWorkingTime: notificationFormValue.isNoticeKMApproveChangeWorkingTime !== null ? notificationFormValue.isNoticeKMApproveChangeWorkingTime : false,
      isAllUserBelongTo: generalFormValue.isAllUserBelongTo !== null ? generalFormValue.isAllUserBelongTo : false,
    };
    if (this.projectEdit?.id) {
      (projectValue as IAddOrEditProjectResponse).id = this.projectEdit.id;
    }
    return projectValue;
  }

  getGeneralForm(): FormGroup<IGeneralFormGroup> {
    return this.projectForm?.get('generalForm') as FormGroup<IGeneralFormGroup>;
  }

  getTeamArrayForm() {
    return this.projectForm?.get('teamArrayForm') as FormArray<FormGroup<ITeamFormGroup>>;
  }

  getTasksArrayForm() {
    return this.projectForm?.get('tasksArrayForm') as FormArray<FormGroup<ITaskFormGroup>>;
  }

  getTargetUserArrayForm() {
    return this.projectForm?.get('targetUserArrayForm') as FormArray<FormGroup<ITargetUserFormGroup>>;
  }

  getNotificationForm() {
    return this.projectForm?.get('notificationForm') as FormGroup<INotificationFormGroup>;
  }
}
