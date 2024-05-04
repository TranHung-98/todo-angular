import { Component, Input } from '@angular/core';
import { IUserResponse } from 'src/app/interfaces/tasks-team.interface';

@Component({
  selector: 'app-project-view-team',
  templateUrl: './project-view-team.component.html',
  styleUrls: ['./project-view-team.component.scss']
})
export class ProjectViewTeamComponent {
  @Input() userList: IUserResponse[] = [];
  displayedColumns: string[] = ['name', 'hours', 'percent', 'billableHours'];
  constructor() { }

  percentTask(billableHours: number, totalHour: number) {
    if (totalHour === 0) return 0;
    return (billableHours / totalHour) * 100;
  }
}
