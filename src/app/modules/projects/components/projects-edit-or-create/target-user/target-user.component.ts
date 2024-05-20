import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EStatusSelect } from 'src/app/enums/status-filter.enum';
import { AddEditApiService } from '../service/add-edit-api.service';
import { AddEditFormService } from '../service/add-edit-form.service';
import { AddEditControllService } from '../service/add-edit-controll.service';
import { IProjectForm, ITargetUserFormGroup } from 'src/app/interfaces/add-edit-project-form.interface';
import { IProjectTargetUsersResponse, IUserNotPaddingResponse } from 'src/app/interfaces/add-edit-project.interface';


@Component({
  selector: 'app-target-user',
  templateUrl: './target-user.component.html',
  styleUrls: ['./target-user.component.scss']
})
export class TargetUserComponent implements OnInit, OnDestroy {
  roleName: string = '';
  status: boolean = false;
  searchUser: string = '';
  getUserSubscription!: Subscription;
  checkIdSubscription!: Subscription;
  userList!: IUserNotPaddingResponse[];
  projectForm!: FormGroup<IProjectForm>;
  userRemoved!: IUserNotPaddingResponse[];
  selectedFilter: string = EStatusSelect.ALL;
  targetUser: IProjectTargetUsersResponse[] = [];
  targetUserOrther: IProjectTargetUsersResponse[] = [];
  activeUserList: IUserNotPaddingResponse[] = [];
  selectFilters = [EStatusSelect.ALL, EStatusSelect.ACTIVE, EStatusSelect.INACTIVE,];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectApiService: AddEditApiService,
    private projectFormService: AddEditFormService,
    public addEditControllService: AddEditControllService,
  ) {
    if (!this.projectFormService.checkFormFieldTasksData()) {
      this.backRoute();
    }
  }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
    if (this.checkIdSubscription) {
      this.checkIdSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getUserSubscription = this.projectApiService.getUsers().subscribe((res) => {
      this.userList = res?.result;
      this.userRemoved = this.userList;
      if (this.targetUserArrayForm.length > 0) {
        this.targetUserArrayForm.controls.forEach(control => {
          this.userList = this.userList.filter(user => user.id != control.value.userId);
        });
      }
    });
  }

  get targetUserArrayForm() {
    return this.projectFormService.getTargetUserArrayForm();
  }

  createTargetUserForm(user: IProjectTargetUsersResponse) {
    return this.fb.group<ITargetUserFormGroup>({
      userId: this.fb.control<number | null>(user.userId),
      roleName: this.fb.control<string | null>(user.roleName),
    });
  }

  removeUserItemForm(userId: number) {
    const index = this.targetUserArrayForm.controls.findIndex(control => control.value.userId === userId);
    const user = this.userRemoved.find(user => user.id === userId);
    if (index !== -1 && user) {
      this.targetUserArrayForm.removeAt(index);
      this.userList.push(user);
      this.userRemoved = this.userRemoved.filter(user => user.id !== userId);
    }
  }

  getNameById(id: number) {
    if (this.userRemoved) {
      const data = this.userRemoved.find(user => user.id === id);
      if (data) {
        this.status = data.isActive;
        return data.name;
      }
    }
    return 'Loading...';
  }


  getEmailById(id: number) {
    if (this.userRemoved) {
      const data = this.userRemoved.find(user => user.id === id);
      if (data) {
        this.status = data.isActive;
        return data.emailAddress;
      }
    }
    return 'Loading...';
  }

  nextRoute() {
    if (this.projectFormService.projectForm.valid) {
      this.router.navigate(['../notification',], { relativeTo: this.route });
    }
  }

  handleAddUser(userId: number) {
    const user = this.addEditControllService.handleFindUserById(userId, this.userList);

    if (user) {
      const targetUserForm = this.fb.group<ITargetUserFormGroup>({
        userId: this.fb.control<number>(user.id),
        roleName: this.fb.control<string>(''),
      });
      this.targetUserArrayForm.push(targetUserForm);
      this.userRemoved.push(user);
      this.userList = this.userList.filter(user => user.id != userId);
    }
  }

  backRoute() {
    this.router.navigate(['../tasks',], { relativeTo: this.route });
  }

  handleSearch(): void {
    const searchTerm = this.searchUser.toLowerCase();
    this.userList = this.userList.filter(user =>
      user.name.toLowerCase().includes(searchTerm) || user.emailAddress.toLowerCase().includes(searchTerm));
  }

  handleFilter() {
    const filter: boolean | string = this.selectedFilter === EStatusSelect.ALL ? EStatusSelect.ALL :
      this.selectedFilter === EStatusSelect.INACTIVE ? false : true;

    if (typeof filter === 'boolean') {
      this.userList = this.userList.filter(user => user.isActive === filter);
    } else {
      this.userList;
    }
  }

}
