import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EStatus } from 'src/app/enums/status-filter.enum';
import { IProjectResponse } from 'src/app/interfaces/project.interface';
import { EProjectTypeId, EProjectTypeList } from 'src/app/enums/project-type.enums';
import { ProjectViewComponent } from '../../../project-view/project-view.component';
import { ProjectApiService } from 'src/app/modules/projects/service/project-api.service';
import { ProjectService } from 'src/app/modules/projects/service/project.service';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  status = EStatus;
  mapProjectType: Map<number, string> = new Map([
    [EProjectTypeId.TM, EProjectTypeList.TM],
    [EProjectTypeId.FF, EProjectTypeList.FF],
    [EProjectTypeId.NB, EProjectTypeList.NB],
    [EProjectTypeId.ODC, EProjectTypeList.ODC],
    [EProjectTypeId.Product, EProjectTypeList.Product],
    [EProjectTypeId.Training, EProjectTypeList.Training],
    [EProjectTypeId.NoSalary, EProjectTypeList.NoSalary]
  ]);
  @Input() project!: IProjectResponse;
  constructor(
    private dialog: MatDialog,
    public projectService: ProjectService,
    private projectApiService: ProjectApiService,
    private sweetalertService: SweetAlertService,
  ) { }

  async handleDeactiveItem() {
    const confirmed = await this.sweetalertService.showConfirmationDialog("Are you sure?", `Deactive project: ${this.project.name}?`, 'Yes', "#efefef", "#7cd1f9");
    if (confirmed) {
      if (this.project.status === this.status.ACTIVE) {
        this.projectApiService.inactiveProject(this.project.id).subscribe((res) => {
          if (res) {
            this.project.status = this.status.INACTIVE;
          }
        });

      } else {
        this.projectApiService.activeProject(this.project.id).subscribe((res) => {
          if (res) {
            this.project.status = this.status.ACTIVE;
          }
        });

      }
    }
  }

  handleViewProject() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const dialogWidth = width >= 1024 ? '800px' : '80vw';
    this.dialog.open(ProjectViewComponent, {
      data: {
        projectId: this.project.id,
      }, height: '80%', width: dialogWidth
    });
  }

  async handleDeleteProjectItem() {
    const confirmed = await this.sweetalertService.showConfirmationDialog("Are you sure?", `Delete project: ${this.project.name}?`, "Yes, delete it!", "#d33", "#67C23A");
    if (confirmed) {
      this.projectApiService.deleteProject(this.project.id).subscribe({
        next: () => {
          this.sweetalertService.fireSuccessAlert('', 'Deleted project successfully', 2000, true, false, 'bottom-end');
          this.projectService.refreshProjectList$.next(true);
        },
        error: () => {
          this.sweetalertService.fireErrorAlert('', 'You can not delete this project', 2000, true, false, 'bottom-end');
        }
      });
    }
  }

}
