import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ERoleType, ERoleTypeId, ETeamType, ETeamTypeId } from 'src/app/enums/team.enums';
import { ITeamFormGroup } from 'src/app/interfaces/add-edit-project-form.interface';
import { IBranchesResponse, IUserNotPaddingResponse } from 'src/app/interfaces/add-edit-project.interface';
import { AddEditFormService } from '../service/add-edit-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditApiService } from '../service/add-edit-api.service';
import { IRoleType, ITeamType } from 'src/app/interfaces/team-type.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  users!: IUserNotPaddingResponse[];
  userRemoved: IUserNotPaddingResponse[] = [];
  branches!: IBranchesResponse[];
  teamTypes: typeof ETeamType = ETeamType;
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

  selectedBranch: string = 'All';
  selectedType: number = ETeamTypeId.All;
  searchUser: string = '';
  searchUserGroup: string = '';
  showUsers = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectFormService: AddEditFormService,
    private projectApiService: AddEditApiService,
  ) {
    if (!this.projectFormService.checkFormFieldGeneralData()) {
      this.backRoute();
    }
  }

  ngOnInit() {
    this.projectApiService.getUsers().subscribe((res) => {
      this.users = res?.result;
      if (this.teamForm.controls.length > 0) {
        this.teamForm.controls.forEach(control => {
          const userIndex = this.users.findIndex(user => user.id === control.value.userId);
          if (userIndex != -1) {
            const removedUser = this.users.find(user => user.id === control.value.userId);
            if (removedUser)
              this.userRemoved.push(removedUser);
          }
        });
      }
    });
    this.projectApiService.getAllBranches(true).subscribe((res) => {
      this.branches = res?.result;
    });
  }

  handleDeadImag(e: Event) {
    const imageElement = e.target as HTMLImageElement;
    imageElement.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjcZjUUSkLXG4I7Kuzr_frds6BTcfuYqFKA2q7Zjvv25VpctHlegZsJhxuqrdX2EU7Lvw&usqp=CAU";
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
      this.router.navigate(['../tasks',], { relativeTo: this.route });
    }
  }

  backRoute() {
    this.router.navigate(['../general',], { relativeTo: this.route });
  }

  removeTeamForm(userId: number) {
    const index = this.teamForm.controls.findIndex(control => control.value.userId === userId);
    const user = this.userRemoved.find(user => user.id === userId);
    if (index && user) {
      this.teamForm.removeAt(index);
      this.users.push(user);
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
      this.users = this.users.filter(user => user.id !== idUser);
    }
  }


}
