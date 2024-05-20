import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/guards.guard';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ProjectService } from './service/project.service';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectsRoutingModule } from './projects-routing.module';
import { LayoutService } from '../layouts/service/layout.service';
import { ProjectApiService } from './service/project-api.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RangeFormatPipe } from 'src/app/shared/pipes/range-format.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { CheckboxComponent } from 'src/app/shared/components/check-box/checkbox.component';
import { ConvertMinuteToHoursPipe } from 'src/app/shared/pipes/convert-minute-to-hours.pipe';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { ManagerProjectComponent } from './components/manager-project/manager-project.component';
import { ProjectListComponent } from './components/manager-project/components/project-list/project-list.component';
import { ProjectItemComponent } from './components/manager-project/components/project-item/project-item.component';
import { ProjectViewTasksComponent } from './components/project-view/project-view-tasks/project-view-tasks.component';
import { ProjectViewTeamComponent } from './components/project-view/project-view-team/project-view-team.component';

@NgModule({
  declarations: [
    ProjectViewComponent,
    ProjectItemComponent,
    ProjectListComponent,
    ProjectViewTeamComponent,
    ProjectViewTasksComponent,
    ManagerProjectComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    ButtonComponent,
    RangeFormatPipe,
    MatDialogModule,
    CheckboxComponent,
    MatExpansionModule,
    TextFieldComponent,
    MatButtonToggleModule,
    ProjectsRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ConvertMinuteToHoursPipe,
  ],
  exports: [
    ProjectsRoutingModule,
  ],
  providers: [AuthGuard, LayoutService, ProjectApiService, ProjectService],
})
export class ProjectsModule { }
