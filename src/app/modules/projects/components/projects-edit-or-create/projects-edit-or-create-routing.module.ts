import { NgModule } from '@angular/core';
import { TeamComponent } from './team/team.component';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { GeneralComponent } from './general/general.component';
import { TargetUserComponent } from './target-user/target-user.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectsEditOrCreateComponent } from './projects-edit-or-create.component';

const routes: Routes = [
  {
    path: '', component: ProjectsEditOrCreateComponent, children: [
      { path: 'team', component: TeamComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'general', component: GeneralComponent },
      { path: 'target-user', component: TargetUserComponent },
      { path: 'notification', component: NotificationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsAddOrEditProjectRoutingModule { }
