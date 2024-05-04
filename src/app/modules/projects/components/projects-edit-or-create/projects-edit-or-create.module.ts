import { NgModule } from "@angular/core";
import { TeamComponent } from "./team/team.component";
import { MatTabsModule } from '@angular/material/tabs';
import { TasksComponent } from "./tasks/tasks.component";
import { SharedModule } from "src/app/shared/shared.module";
import { GeneralComponent } from "./general/general.component";
import { AddClientComponent } from './add-client/add-client.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectsAddOrEditProjectRoutingModule } from "./projects-edit-or-create-routing.module";
import { ProjectsEditOrCreateComponent } from "./projects-edit-or-create.component";


@NgModule({
  declarations: [
    TeamComponent,
    TasksComponent,
    GeneralComponent,
    AddClientComponent,
    NotificationComponent,
    ProjectsEditOrCreateComponent,
  ],
  imports: [
    SharedModule,
    MatTabsModule,
  ],
  exports: [ProjectsAddOrEditProjectRoutingModule]
})
export class ProjectsAddOrEditProjectModule { }
