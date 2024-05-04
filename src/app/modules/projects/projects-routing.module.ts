import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ProjectViewTasksComponent } from './components/project-view/project-view-tasks/project-view-tasks.component';
import { ProjectViewTeamComponent } from './components/project-view/project-view-team/project-view-team.component';
import { ManagerProjectComponent } from './components/manager-project/manager-project.component';

const routes: Routes = [
  { path: '', component: ManagerProjectComponent },
  { path: 'create', loadChildren: () => import('../projects/components/projects-edit-or-create/projects-edit-or-create.module').then(m => m.ProjectsAddOrEditProjectModule) },
  { path: 'edit/:id', loadChildren: () => import('../projects/components/projects-edit-or-create/projects-edit-or-create.module').then(m => m.ProjectsAddOrEditProjectModule) },
  {
    path: 'view/:id', component: ProjectViewComponent,
    children: [
      { path: 'tasks', component: ProjectViewTasksComponent },
      { path: 'team', component: ProjectViewTeamComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
