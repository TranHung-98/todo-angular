import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AddEditApiService } from './service/add-edit-api.service';
import { ERouteLabels } from 'src/app/enums/route-labels.enums';
import { AddEditFormService } from './service/add-edit-form.service';
import { IProjectForm } from 'src/app/interfaces/add-edit-project-form.interface';
import { AddEditControllService } from './service/add-edit-controll.service';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';
import { EIndex, EStatus } from 'src/app/enums/status-filter.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-edit-or-create',
  templateUrl: './projects-edit-or-create.component.html',
  styleUrls: ['./projects-edit-or-create.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ProjectsEditOrCreateComponent implements OnInit, OnDestroy {
  index = EIndex;
  projectId!: number;
  projectSubscription!: Subscription;
  projectForm!: FormGroup<IProjectForm>;

  routeLabel = [
    { label: ERouteLabels.General, routerLink: 'general' },
    { label: ERouteLabels.Team, routerLink: 'team' },
    { label: ERouteLabels.Tasks, routerLink: 'tasks' },
    { label: ERouteLabels.TargetUser, routerLink: 'target-user' },
    { label: ERouteLabels.Notification, routerLink: 'notification' },
  ];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public projectFormService: AddEditFormService,
    private projectApiService: AddEditApiService,
    private sweetAlertService: SweetAlertService,
    public controllAddEditService: AddEditControllService,
  ) { }

  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.controllAddEditService.setHideTargetUser();
    this.controllAddEditService.setTargetUserIdEmtry();
    const id = this.activatedRoute.snapshot.params?.['id'];
    this.projectId = id;
    if (id) {
      this.projectSubscription = this.projectApiService.getProject(id).subscribe({
        next: (res) => {
          this.projectFormService.buildProjectForm(res?.result);
          this.projectForm = this.projectFormService.projectForm;
        },
        error: (error) => {
          console.error("Error fetching project:", error);
        }
      });
    }
    else {
      this.projectFormService.buildProjectForm();
      this.projectForm = this.projectFormService.projectForm;
    }

  }

  get showTargetUser(): boolean {
    return this.controllAddEditService.checkShadow();
  }

  get generalForm() {
    return this.projectFormService.getGeneralForm();
  }

  get teamArrayForm() {
    return this.projectFormService.getTeamArrayForm();
  }

  canNavigate(index: number): boolean {
    switch (index) {
    case EIndex.ZERO:
      return true;
    case EIndex.ONE:
      return this.projectFormService?.projectForm?.valid === true;
    case EIndex.TWO:
      return this.projectFormService.checkFormFieldTeamData();
    case EIndex.THREE:
      return this.projectFormService.checkFormFieldTasksData() || this.projectFormService.checkFormFieldTeamData();
    case EIndex.FOUR:
      return this.projectFormService.checkFormFieldTasksData();
    default:
      return false;
    }
  }

  disabledSubmit() {
    return !(this.projectFormService.checkFormFieldGeneralData() &&
      this.projectFormService.checkFormFieldNotificationData() &&
      this.projectFormService.checkFormFieldTasksData() &&
      this.projectFormService.checkFormFieldTeamData());
  }


  onSave() {
    if (this.teamArrayForm.controls.every(teamControls => teamControls.controls.type.value !== EStatus.MEMBER)) {
      this.sweetAlertService.fireErrorAlert('<strong>Please add at least one team member</strong>', '', 2000, false, true, 'center', 'Ok', '#7cd1f9');
      return;
    }
    if (this.teamArrayForm.controls.every(teamControls => teamControls.controls.type.value !== EStatus.PM)) {
      this.sweetAlertService.fireErrorAlert('<strong>Project must have a PM!</strong>', '', 2000, false, true, 'center', 'Ok', '#7cd1f9');
      return;
    }

    const project = this.projectFormService.getValueProjectForm();
    this.projectSubscription = this.projectApiService.saveProject(project)
      .subscribe({
        next: () => {
          this.sweetAlertService.fireSuccessAlert(!this.projectId ? 'Create project successfully' : 'Update project successfully', '', 2000, true, false, 'top-right');
          this.controllAddEditService.setHideTargetUser();
          this.controllAddEditService.setTargetUserIdEmtry();
          this.projectService.refreshProjectList$.next(true);
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.sweetAlertService.fireErrorAlert('', err.error.error.message, 2000, true, false, 'top-right', 'Ok', '');
        }
      });
  }
}
