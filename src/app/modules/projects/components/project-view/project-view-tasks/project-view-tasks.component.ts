import { Component, Input } from '@angular/core';
import { ITaskResponse } from 'src/app/interfaces/tasks-team.interface';

@Component({
  selector: 'app-project-view-tasks',
  templateUrl: './project-view-tasks.component.html',
  styleUrls: ['./project-view-tasks.component.scss']
})
export class ProjectViewTasksComponent {
  @Input() taskList: ITaskResponse[] = [];
  displayedColumns: string[] = ['tasks', 'hours', 'percent', 'billableHours'];
  percentTask(billableHours: number, totalHour: number) {
    if (totalHour === 0) return 0;
    return (billableHours / totalHour) * 100;
  }

}
