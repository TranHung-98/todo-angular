import { NgModule } from "@angular/core";
import { TeamComponent } from "./team/team.component";
import { MatTabsModule } from '@angular/material/tabs';
import { TasksComponent } from "./tasks/tasks.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";
import { GeneralComponent } from "./general/general.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddClientComponent } from './add-client/add-client.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectsAddOrEditProjectRoutingModule } from "./projects-edit-or-create-routing.module";
import { ProjectsEditOrCreateComponent } from "./projects-edit-or-create.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AddEditFormService } from "./service/add-edit-form.service";
import { AddEditService } from "./service/add-edit.service";
import { FilterClientPipe } from "src/app/shared/pipes/filter-client.pipe";
import { MatExpansionModule } from "@angular/material/expansion";
import { FilterMemberPipe } from "src/app/shared/pipes/filter-member.pipe";



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
  providers: [AddEditService, AddEditFormService],
  exports: [ProjectsAddOrEditProjectRoutingModule]
})
export class ProjectsAddOrEditProjectModule { }
