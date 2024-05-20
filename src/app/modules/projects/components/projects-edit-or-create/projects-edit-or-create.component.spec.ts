import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsEditOrCreateComponent } from './projects-edit-or-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { AddEditApiService } from './service/add-edit-api.service';
import { AddEditFormService } from './service/add-edit-form.service';
import { AddEditControllService } from './service/add-edit-controll.service';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('ProjectsEditOrCreateComponent', () => {
  let component: ProjectsEditOrCreateComponent;
  let fixture: ComponentFixture<ProjectsEditOrCreateComponent>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: { id: '1' } } });
    const projectServiceSpyObj = jasmine.createSpyObj('ProjectService', ['refreshProjectList$']);
    const addEditApiServiceSpyObj = jasmine.createSpyObj('AddEditApiService', ['getProject', 'saveProject']);
    const addEditFormServiceSpyObj = jasmine.createSpyObj('AddEditFormService', ['buildProjectForm', 'getValueProjectForm']);
    const addEditControllServiceSpyObj = jasmine.createSpyObj('AddEditControllService', ['setHideTargetUser', 'setTargetUserIdEmtry']);
    const sweetAlertServiceSpyObj = jasmine.createSpyObj('SweetAlertService', ['fireSuccessAlert', 'fireErrorAlert']);

    await TestBed.configureTestingModule({
      declarations: [ProjectsEditOrCreateComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteSpyObj },
        { provide: ProjectService, useValue: projectServiceSpyObj },
        { provide: AddEditApiService, useValue: addEditApiServiceSpyObj },
        { provide: AddEditFormService, useValue: addEditFormServiceSpyObj },
        { provide: AddEditControllService, useValue: addEditControllServiceSpyObj },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpyObj }
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsEditOrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

