import { Router } from '@angular/router';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EStatus } from 'src/app/enums/status-filter.enum';
import { IProjectResponse } from 'src/app/interfaces/project.interface';
import { EProjectTypeId, EProjectTypeList } from 'src/app/enums/project-type.enums';
import { ProjectViewComponent } from '../../../project-view/project-view.component';
import { ProjectApiService } from 'src/app/modules/projects/service/project-api.service';
import { ProjectService } from 'src/app/modules/projects/service/project.service';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnDestroy {
  status = EStatus;
  destroy$ = new Subject<void>();
  @Input() project!: IProjectResponse;
  mapProjectType: Map<number, string> = new Map([
    [EProjectTypeId.TM, EProjectTypeList.TM],
    [EProjectTypeId.FF, EProjectTypeList.FF],
    [EProjectTypeId.NB, EProjectTypeList.NB],
    [EProjectTypeId.ODC, EProjectTypeList.ODC],
    [EProjectTypeId.Product, EProjectTypeList.Product],
    [EProjectTypeId.Training, EProjectTypeList.Training],
    [EProjectTypeId.NoSalary, EProjectTypeList.NoSalary]
  ]);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public projectService: ProjectService,
    private projectApiService: ProjectApiService,
    private sweetalertService: SweetAlertService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProjectTypeName(): string {
    return this.mapProjectType.get(this.project.projectType) || 'Unknown Project Type';
  }

  async handleDeactiveAndActiveItem() {
    const confirmed = await this.sweetalertService.showConfirmationDialog("Are you sure?", `Deactive project: ${this.project.name}?`, 'Yes', "#efefef", "#7cd1f9");
    if (confirmed) {
      if (this.project.status === this.status.ACTIVE) {
        this.projectApiService.inactiveProject(this.project.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.project.status = this.status.INACTIVE;
              }
            },
            error: (error) => {
              this.sweetalertService.fireErrorAlert('', `${error?.error?.error?.message}!`, 2000, true, false, 'bottom-end', 'Ok', '#7066e0');
            }
          });
      } else {
        this.projectApiService.activeProject(this.project.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.project.status = this.status.ACTIVE;
              }
            },
            error: (error) => {
              this.sweetalertService.fireErrorAlert('', `${error?.error?.error?.message}!`, 2000, true, false, 'bottom-end', 'Ok', '#7066e0');
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
      this.projectApiService.deleteProject(this.project.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.sweetalertService.fireSuccessAlert('', 'Deleted project successfully!', 2000, true, false, 'bottom-end');
            this.projectService.refreshProjectList$.next(true);
          },
          error: (error) => {
            this.sweetalertService.fireErrorAlert('', `${error?.error?.error?.message}!`, 2000, true, false, 'bottom-end', 'Ok', '#7066e0');
          }
        });
    }
  }


  handleEditProject() {
    this.router.navigate([`/projects/edit/${this.project.id}/general`]);
  }

}
