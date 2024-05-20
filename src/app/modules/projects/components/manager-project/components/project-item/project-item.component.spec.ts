import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectItemComponent } from './project-item.component';
import { MatDialog, } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectApiService } from 'src/app/modules/projects/service/project-api.service';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';
import { ProjectService } from 'src/app/modules/projects/service/project.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { IProjectResponse } from 'src/app/interfaces/project.interface';
import { EProjectTypeId } from 'src/app/enums/project-type.enums';


describe('ProjectItemComponent', () => {
  let router: Router;
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

  const mockProject: IProjectResponse = {
    customerName: "abc",
    name: "thang12345",
    code: "thang12345",
    status: 1,
    pms: ["Tiến Phạm Mạnh"],
    activeMember: 3,
    projectType: EProjectTypeId.TM,
    timeStart: new Date(),
    timeEnd: new Date(),
    id: 20275
  };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const projectServiceStub = {
      refreshProjectList$: of(true)
    };
    const projectApiServiceStub = {
      inactiveProject: () => of({ success: true }),
      activeProject: () => of({ success: true }),
      deleteProject: () => of({ success: true })
    };
    const sweetalertServiceStub = {
      showConfirmationDialog: () => Promise.resolve(true),
      fireSuccessAlert: () => { },
      fireErrorAlert: () => { }
    };

    await TestBed.configureTestingModule({
      declarations: [ProjectItemComponent],
      imports: [
        MatMenuModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: ProjectService, useValue: projectServiceStub },
        { provide: ProjectApiService, useValue: projectApiServiceStub },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Overlay, useValue: {} },
        { provide: SweetAlertService, useValue: sweetalertServiceStub },
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive @Input() project data', () => {

    component.project = mockProject;

    fixture.detectChanges();

    expect(component.project).toEqual(mockProject);
    expect(component.project.name).toBe('thang12345');
    expect(component.project.pms[0]).toBe('Tiến Phạm Mạnh');
    expect(component.project.projectType).toBe(0);
    expect(component.getProjectTypeName()).toBe('T&M');
  });

  it('should return correct project type name', () => {

    component.project = mockProject;

    fixture.detectChanges();

    expect(component.getProjectTypeName()).toBe('T&M');
  });

  it('should navigate to the edit page when handleEditProject is called', () => {

    component.project = mockProject;

    fixture.detectChanges();

    component.handleEditProject();

    expect(router.navigate).toHaveBeenCalledWith([`/projects/edit/${component.project.id}/general`]);
  });

});
