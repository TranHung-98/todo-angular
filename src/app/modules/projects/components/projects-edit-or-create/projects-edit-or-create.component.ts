import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProjectForm } from 'src/app/interfaces/add-edit-project-form.interface';
import { ProjectService } from '../../service/project.service';
import Swal from 'sweetalert2';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AddEditFormService } from '../../service/add-edit-form.service';
import { AddEditService } from '../../service/add-edit.service';
import { ERouteLabels } from 'src/app/enums/route-labels.enums';

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
export class ProjectsEditOrCreateComponent implements OnInit {
  projectId: number | undefined;
  projectForm!: FormGroup<IProjectForm>;
  routeLabel = [
    { label: ERouteLabels.General, routerLink: 'general' },
    { label: ERouteLabels.Team, routerLink: 'team' },
    { label: ERouteLabels.Tasks, routerLink: 'tasks' },
    { label: ERouteLabels.Notification, routerLink: 'notification' }
  ];
  constructor(
    private projectFormService: AddEditFormService,
    private projectApiService: AddEditService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params?.['id'];
    this.projectId = id;
    if (id) {
      this.projectApiService.getProject(id).subscribe((res) => {
        this.projectFormService.buildProjectForm(res?.result);
        this.projectForm = this.projectFormService.projectForm;
      });
    }
    else {
      this.projectFormService.buildProjectForm();
      this.projectForm = this.projectFormService.projectForm;
    }
  }
  canNavigate(index: number): boolean {
    if (index === 0) return true;
    if (index === 1 && this.projectFormService?.projectForm?.valid) return true;
    if (index === 2 || index === 3) {
      if (this.projectFormService?.projectForm?.valid && this.teamArrayForm.length !== 0 && !this.teamArrayForm.controls.every(teamControls => teamControls.controls.type.value !== 1)) {
        return true;
      }
    }
    return false;
  }
  get generalForm() {
    return this.projectFormService.getGeneralForm();
  }

  get teamArrayForm() {
    return this.projectFormService.getTeamArrayForm();
  }

  disabledSubmit() {
    if (this.projectFormService.projectForm.invalid) {
      return true;
    }
    return false;
  }

  onSave() {
    if (this.teamArrayForm.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '<strong>Please add at least one team member</strong>',
        confirmButtonText: "OK",
        confirmButtonColor: '#7cd1f9',
      });
      return;
    }
    if (this.teamArrayForm.controls.every(teamControls => teamControls.controls.type.value !== 1)) {
      Swal.fire({
        icon: 'error',
        title: '<strong>Project must have a PM!</strong>',
        confirmButtonText: "OK",
        confirmButtonColor: '#7cd1f9',
      });
      return;
    }

    const project = this.projectFormService.getValueProjectForm();
    this.projectApiService.saveProject(project).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          text: !this.projectId ? 'Create project successfully' : 'Update project successfully',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
        });
        this.projectService.refreshProjectList$.next(true);
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: err.error.error.message,
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }



}
