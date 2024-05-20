import { Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddEditApiService } from '../service/add-edit-api.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddEditFormService } from '../service/add-edit-form.service';
import { IRoleType, ITeamType, IUserTempType } from 'src/app/interfaces/team-type.interface';
import { AddEditControllService } from '../service/add-edit-controll.service';
import { ITeamFormGroup } from 'src/app/interfaces/add-edit-project-form.interface';
import { ERoleType, ERoleTypeId, ETeamType, ETeamTypeId } from 'src/app/enums/team.enums';
import { IBranchesResponse, IUserNotPaddingResponse } from 'src/app/interfaces/add-edit-project.interface';
import { ETemp } from 'src/app/enums/temp.enum';
import { IBaseResponse } from 'src/app/modules/authen/interfaces/login.interface';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  branches!: IBranchesResponse[];
  users!: IUserNotPaddingResponse[];
  getUserSubscription!: Subscription;
  teamTypes: typeof ETeamType = ETeamType;
  userRemoved: IUserNotPaddingResponse[] = [];

  branches$ = this.projectApiService.getAllBranches(true)
    .pipe(map((response: IBaseResponse<IBranchesResponse[]>) => response.result));

  get teamForm(): FormArray<FormGroup<ITeamFormGroup>> {
    return this.projectFormService.getTeamArrayForm();
  }
  typeProjects: ITeamType[] = [
    { typeId: ETeamTypeId.All, typeName: ETeamType.All },
    { typeId: ETeamTypeId.Staff, typeName: ETeamType.Staff },
    { typeId: ETeamTypeId.Internship, typeName: ETeamType.Internship },
    { typeId: ETeamTypeId.Collaborator, typeName: ETeamType.Collaborator }
  ];

  typeRoles: IRoleType[] = [
    { typeId: ERoleTypeId.Member, typeName: ERoleType.Member },
    { typeId: ERoleTypeId.PM, typeName: ERoleType.PM },
    { typeId: ERoleTypeId.Shadow, typeName: ERoleType.Shadow },
    { typeId: ERoleTypeId.Deactive, typeName: ERoleType.Deactive }
  ];

  temp: IUserTempType[] = [
    { tempName: ETemp.TEMP, isTemp: false },
    { tempName: ETemp.OFFICIAL, isTemp: true },
  ];

  selectedBranch: string = 'All';
  selectedType: number = ETeamTypeId.All;
  searchUser: string = '';
  searchUserGroup: string = '';
  showUsers = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectApiService: AddEditApiService,
    private projectFormService: AddEditFormService,
    public controllAddEditService: AddEditControllService,
  ) {
    if (!this.projectFormService.checkFormFieldGeneralData()) {
      this.backRoute();
    }
  }

  ngOnDestroy(): void {
    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getUserSubscription = this.projectApiService.getUsers()
      .subscribe((res) => {
        this.users = res?.result;
        if (this.teamForm.controls.length > 0) {
          this.teamForm.controls.forEach(control => {
            const userIndex = this.users.findIndex(user => user.id === control.value.userId);
            if (userIndex != -1) {
              const removedUser = this.users.find(user => user.id === control.value.userId);
              if (removedUser)
                this.userRemoved.push(removedUser);
            }
            if (control.value && control.value.userId) {
              if (this.users.some((user) => user.id === control.value.userId)) {
                this.controllAddEditService.setTargetUserId(control.value.userId);
              }
            }
          });
        }
      });
  }


  handleDeadImag(e: Event) {
    const imageElement = e.target as HTMLImageElement;
    imageElement.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQPD6J3CI0wbzM_Ok2cZ3qaLIEll3KFpKNzZ2SWWqkfhKZ0A6KaIp7HSw-7F2Yig6ydE&usqp=CAU";
  }

  getNameType(typeId: number): string {
    const type = this.typeProjects.find(type => type.typeId === typeId);
    return type?.typeName || '';
  }

  getUser(userId: number): IUserNotPaddingResponse | undefined {
    return this.userRemoved.find(user => user.id === userId);
  }

  nextRoute() {
    if (this.projectFormService.projectForm.valid) {
      this.router.navigate(['tasks',], { relativeTo: this.route.parent });
    }
  }


  backRoute() {
    this.router.navigate(['../general',], { relativeTo: this.route });
  }

  revertAndRemoveTeamForm(userId: number) {
    const index = this.teamForm.controls.findIndex(control => control.value.userId === userId);
    const user = this.userRemoved.find(user => user.id === userId);
    if (index !== -1 && user) {
      this.teamForm.removeAt(index);
      this.controllAddEditService.setBackTargetUser(userId);
      this.userRemoved = this.userRemoved.filter(user => user.id !== userId);
    }
  }

  addUserForm(idUser: number) {
    const user = this.users.find((user) => user.id === idUser);
    if (user) {
      const userForm = this.fb.group<ITeamFormGroup>({
        userId: this.fb.control<number>(user?.id),
        type: this.fb.control<number>(1),
        isTemp: this.fb.control<boolean>(false)
      });
      this.teamForm.push(userForm);
      this.userRemoved.push(user);
      this.controllAddEditService.setTargetUserId(user.id);
    }
  }
}
