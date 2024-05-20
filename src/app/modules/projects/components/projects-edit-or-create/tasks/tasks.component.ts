import { FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditApiService } from '../service/add-edit-api.service';
import { AddEditFormService } from '../service/add-edit-form.service';
import { ITasksResponse } from 'src/app/interfaces/add-edit-project.interface';
import { ITaskFormGroup } from 'src/app/interfaces/add-edit-project-form.interface';
import { AddEditControllService } from '../service/add-edit-controll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasksAll: ITasksResponse[] = [];
  tasksOther: ITasksResponse[] = [];
  tasksSubscription!: Subscription;
  get tasksArrayForm() {
    return this.projectFormService.getTasksArrayForm();
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectApiService: AddEditApiService,
    private projectFormService: AddEditFormService,
    private controllAddEditService: AddEditControllService,
  ) {
    if (!this.projectFormService.checkFormFieldTeamData()) {
      this.backRoute();
    }
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.tasksSubscription = this.projectApiService.getAllTasks().subscribe(res => {
      this.tasksAll = res?.result;
      if (!this.tasksArrayForm.length) {
        this.tasksAll.forEach(task => {
          if (!task.type) this.tasksArrayForm.push(this.createTaskForm(task));
        });
      }
      this.tasksOther = this.tasksAll.filter(taskAll =>
        !this.tasksArrayForm.value.some(taskForm => taskForm.taskId === taskAll.id)
      );
    });
  }

  createTaskForm(task: ITasksResponse) {
    return this.fb.group<ITaskFormGroup>({
      taskId: this.fb.control<number>(task.id),
      billable: this.fb.control<boolean>(true),
    });
  }

  removeTaskForm(taskId: number) {
    const index = this.tasksArrayForm.controls.findIndex(control => control.value.taskId === taskId);
    this.tasksArrayForm.removeAt(index);
  }

  getNameById(id: number) {
    return this.tasksAll.find(task => task.id === id)?.name;
  }

  addTask(id: number) {
    const task = this.tasksAll.find(task => task.id === id);
    if (task) {
      this.tasksArrayForm.push(this.createTaskForm(task));
      this.tasksOther = this.tasksOther.filter(task => task.id !== id);
    }
  }

  nextRoute() {
    if (this.projectFormService.projectForm.valid) {
      if (this.controllAddEditService.checkShadow()) {
        this.router.navigate(['target-user',], { relativeTo: this.route.parent });
      } else {
        this.router.navigate(['notification',], { relativeTo: this.route.parent });
      }
    }
  }

  backRoute() {
    this.router.navigate(['team',], { relativeTo: this.route.parent });
  }


  removeTask(id: number) {
    const taskIndex = this.tasksAll.findIndex(task => task.id === id);
    if (taskIndex) {
      this.tasksArrayForm.removeAt(this.tasksArrayForm.controls.findIndex(control => control.value.taskId === id));
      this.tasksOther.push(this.tasksAll[taskIndex]);
    }
  }

}
