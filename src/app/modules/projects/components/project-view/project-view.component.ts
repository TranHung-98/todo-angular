import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ERangeTime } from 'src/app/enums/select-range-time.enums';
import { ITaskOrTeamRequest, ITaskResponse, IUserResponse } from 'src/app/interfaces/tasks-team.interface';
import { ProjectService } from '../../service/project.service';
import { ProjectApiService } from '../../service/project-api.service';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear, subWeeks, subMonths, subQuarters, subYears, addWeeks, addMonths, addQuarters, addYears, format } from 'date-fns';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent implements OnInit {
  optionRangeTimes = [ERangeTime.Week, ERangeTime.Month, ERangeTime.Quarter, ERangeTime.Year, ERangeTime.AllTime, ERangeTime.CustomTime];
  selectedRangeTime = ERangeTime.Week;
  userList: IUserResponse[] = [];
  taskList: ITaskResponse[] = [];
  today!: Date;
  startDate!: Date;
  endDate!: Date;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: number }, private projectService: ProjectService, private projectApiService: ProjectApiService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.updateDates();
    this.changeRequest();
  }

  updateDates() {
    if (this.selectedRangeTime === ERangeTime.Week) {
      this.startDate = startOfWeek(this.today, { weekStartsOn: 1 });
      this.endDate = endOfWeek(this.today, { weekStartsOn: 1 });
    } else if (this.selectedRangeTime === ERangeTime.Month) {
      this.startDate = startOfMonth(this.today);
      this.endDate = endOfMonth(this.today);
    } else if (this.selectedRangeTime === ERangeTime.Quarter) {
      this.startDate = startOfQuarter(this.today);
      this.endDate = endOfQuarter(this.today);
    } else if (this.selectedRangeTime === ERangeTime.Year) {
      this.startDate = startOfYear(this.today);
      this.endDate = endOfYear(this.today);
    }
    this.changeRequest();
  }

  changeRequest() {
    let teamOrTaskRequest: ITaskOrTeamRequest = {
      projectId: this.data.projectId,
      startDate: format(this.startDate, 'yyyy-MM-dd'),
      endDate: format(this.endDate, 'yyyy-MM-dd')
    };
    if (this.selectedRangeTime === ERangeTime.AllTime) {
      teamOrTaskRequest = {
        projectId: this.data.projectId,
        startDate: '',
        endDate: '',
      };
    }
    this.projectApiService.getTaskByProject(teamOrTaskRequest).subscribe((taskListResponse) => {
      this.taskList = taskListResponse?.result;
    });
    this.projectApiService.getTeamByProject(teamOrTaskRequest).subscribe((teamListResponse) => {
      this.userList = teamListResponse?.result;
    });
  }

  calculatePreviousTime() {
    if (this.selectedRangeTime === ERangeTime.Week) {
      this.startDate = subWeeks(this.startDate, 1);
      this.endDate = subWeeks(this.endDate, 1);
    } else if (this.selectedRangeTime === ERangeTime.Month) {
      this.startDate = subMonths(this.startDate, 1);
      this.endDate = subMonths(this.endDate, 1);
    } else if (this.selectedRangeTime === ERangeTime.Quarter) {
      this.startDate = subQuarters(this.startDate, 1);
      this.endDate = subQuarters(this.endDate, 1);
    } else if (this.selectedRangeTime === ERangeTime.Year) {
      this.startDate = subYears(this.startDate, 1);
      this.endDate = subYears(this.endDate, 1);
    }
    this.changeRequest();
  }

  calculateNextTime() {
    if (this.selectedRangeTime === ERangeTime.Week) {
      this.startDate = addWeeks(this.startDate, 1);
      this.endDate = addWeeks(this.endDate, 1);
    } else if (this.selectedRangeTime === ERangeTime.Month) {
      this.startDate = addMonths(this.startDate, 1);
      this.endDate = addMonths(this.endDate, 1);
    } else if (this.selectedRangeTime === ERangeTime.Quarter) {
      this.startDate = addQuarters(this.startDate, 1);
      this.endDate = addQuarters(this.endDate, 1);
    } else if (this.selectedRangeTime === ERangeTime.Year) {
      this.startDate = addYears(this.startDate, 1);
      this.endDate = addYears(this.endDate, 1);
    }
    this.changeRequest();
  }
}
