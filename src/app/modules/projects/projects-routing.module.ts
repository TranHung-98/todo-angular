import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerProjectComponent } from './components/manager-project/manager-project.component';

const routes: Routes = [
  { path: '', component: ManagerProjectComponent },
  { path: 'create', loadChildren: () => import('../projects/components/projects-edit-or-create/projects-edit-or-create.module').then(m => m.ProjectsAddOrEditProjectModule) },
  { path: 'edit/:id', loadChildren: () => import('../projects/components/projects-edit-or-create/projects-edit-or-create.module').then(m => m.ProjectsAddOrEditProjectModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
