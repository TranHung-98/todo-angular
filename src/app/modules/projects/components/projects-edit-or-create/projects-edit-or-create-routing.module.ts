import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsEditOrCreateComponent } from './projects-edit-or-create.component';
import { GeneralComponent } from './general/general.component';
import { TeamComponent } from './team/team.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '', component: ProjectsEditOrCreateComponent, children: [
      { path: 'general', component: GeneralComponent },
      { path: 'team', component: TeamComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'notification', component: Notification },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsAddOrEditProjectRoutingModule { }
