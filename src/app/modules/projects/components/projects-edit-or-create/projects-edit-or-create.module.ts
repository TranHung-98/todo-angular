import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TeamComponent } from "./team/team.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { TasksComponent } from "./tasks/tasks.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDividerModule } from '@angular/material/divider';
import { GeneralComponent } from "./general/general.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AddEditApiService } from "./service/add-edit-api.service";
import { AddEditFormService } from "./service/add-edit-form.service";
import { AddClientComponent } from './add-client/add-client.component';
import { FilterMemberPipe } from "src/app/shared/pipes/filter-member.pipe";
import { TargetUserComponent } from './target-user/target-user.component';
import { FilterClientPipe } from "src/app/shared/pipes/filter-client.pipe";
import { AddEditControllService } from "./service/add-edit-controll.service";
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
    TargetUserComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FilterClientPipe,
    FilterMemberPipe,
    MatCheckboxModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [AddEditApiService, AddEditFormService, AddEditControllService],
  exports: [ProjectsAddOrEditProjectRoutingModule]
})
export class ProjectsAddOrEditProjectModule { }
