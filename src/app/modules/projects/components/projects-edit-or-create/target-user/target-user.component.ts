import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddEditApiService } from '../service/add-edit-api.service';
import { EStatusSelect } from 'src/app/enums/status-filter.enum';
import { AddEditFormService } from '../service/add-edit-form.service';
import { IUserNotPaddingResponse } from 'src/app/interfaces/add-edit-project.interface';
import { IProjectForm, ITargetUserFormGroup } from 'src/app/interfaces/add-edit-project-form.interface';
import { AddEditControllService } from '../service/add-edit-controll.service';


@Component({
  selector: 'app-target-user',
  templateUrl: './target-user.component.html',
  styleUrls: ['./target-user.component.scss']
})
export class TargetUserComponent implements OnInit, OnDestroy {
  roleName: string = '';
  searchUser: string = '';
  userList!: IUserNotPaddingResponse[];
  getUserSubscription!: Subscription;
  userListShow!: IUserNotPaddingResponse[];
  selectedFilter: string = EStatusSelect.ALL;
  activeUserList: IUserNotPaddingResponse[] = [];
  selectFilters = [EStatusSelect.ALL, EStatusSelect.ACTIVE, EStatusSelect.INACTIVE,];
  projectForm!: FormGroup<IProjectForm>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectApiService: AddEditApiService,
    private projectFormService: AddEditFormService,
    private addEditControllService: AddEditControllService,

  ) { }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserSubscription = this.projectApiService.getUsers().subscribe((res) => {
      this.userList = res?.result;
      this.userListShow = this.userList;
    });
    this.projectForm = this.projectFormService.projectForm;
  }

  get targetUserArrayForm() {
    return this.projectFormService.getTargetUserArrayForm();
  }

  createTargetUserForm(user: ITargetUserFormGroup) {
    this.projectForm.controls.targetUserArrayForm?.push(this.fb.group<ITargetUserFormGroup>({
      userId: this.fb.control<number | null>(user.userId),
      roleName: this.fb.control<string | null>(user.roleName),
    }));
    // eslint-disable-next-line no-console
    console.log(this.projectForm.controls.targetUserArrayForm);
  }

  removeUserItemForm(userId: number) {
    if (Array.isArray(this.activeUserList)) {
      const index = this.activeUserList.findIndex(user => user.id === userId);
      if (index !== -1) {
        this.activeUserList.splice(index, 1);
      }
    }
  }

  returnFormGroup() {
    if (this.projectForm.controls.targetUserArrayForm?.controls && this.projectForm.controls.targetUserArrayForm?.controls.length > 0) {
      return this.projectForm.controls.targetUserArrayForm?.controls;
    }
    else {
      return this.projectForm.controls.targetUserArrayForm?.controls;
    }
  }

  nextRoute() {
    if (this.projectFormService.projectForm.valid) {
      this.router.navigate(['../notification',], { relativeTo: this.route });
    }
  }

  handleAddUser(userId: number) {
    const userItem = this.addEditControllService.handleAddUser(userId, this.userList);
    if (userItem) {
      const targetFormGroupPayload: ITargetUserFormGroup = {
        userId: new FormControl(userItem.id),
        roleName: new FormControl(''),
      };
      this.createTargetUserForm(targetFormGroupPayload);

      this.activeUserList.push(userItem);
      this.userList = this.userList.filter(user => user.id != userId);
      this.userListShow = this.userList;

    }
  }

  backRoute() {
    this.router.navigate(['../team',], { relativeTo: this.route });
  }

  handleSearch(): void {
    const searchTerm = this.searchUser.toLowerCase();
    this.userListShow = this.userList.filter(user =>
      user.name.toLowerCase().includes(searchTerm) || user.emailAddress.toLowerCase().includes(searchTerm));

  }

  handleFilter() {
    const filter: boolean | string = this.selectedFilter === EStatusSelect.ALL ? EStatusSelect.ALL :
      this.selectedFilter === EStatusSelect.INACTIVE ? false : true;

    if (typeof filter === 'boolean') {
      this.userListShow = this.userList.filter(user => user.isActive === filter);
    } else {
      this.userListShow = this.userList;
    }
  }

}
