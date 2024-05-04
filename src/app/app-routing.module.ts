import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLayoutComponent } from './modules/layouts/project-layout/project-layout.component';
import { LoginLayoutComponent } from './modules/layouts/login-layout/login-layout.component';
import { PageNotFoundComponent } from './modules/layouts/page-not-found/page-not-found.component';
import { AuthGuard } from './modules/projects/guards/guards.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'projects', component: ProjectLayoutComponent, children: [
      { path: '', loadChildren: () => import('../app/modules/projects/projects.module').then((m) => m.ProjectsModule) }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginLayoutComponent, children: [
      { path: '', loadChildren: () => import('./modules/authen/auth.module').then((m) => m.AuthModule) }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
