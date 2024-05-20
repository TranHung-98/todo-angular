import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { ActivatedRoute, } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectListComponent } from './project-list.component';
import { ProjectApiService } from 'src/app/modules/projects/service/project-api.service';
import { IProjectResponse } from 'src/app/interfaces/project.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ProjectService } from 'src/app/modules/projects/service/project.service';



describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  const mockProjects: IProjectResponse[] = [{
    id: 1,
    projectType: 2,
    timeEnd: new Date(),
    timeStart: new Date(),
    customerName: 'Customer A',
    name: 'Project 1',
    code: 'P1',
    status: 1,
    pms: [],
    activeMember: 5,
  }];

  beforeEach(async () => {
    const projectServiceStub = {
      filter$: new Subject(),
      refreshProjectList$: new Subject()
    };

    const projectApiServiceStub = {
      getAllProjects: jasmine.createSpy('getAllProjects').and.returnValue(of({ result: [] }))
    };

    const activatedRouteStub = {
      queryParams: of({ status: '1', search: 'test' })
    };

    await TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      imports: [CommonModule, MatExpansionModule, NoopAnimationsModule, HttpClientTestingModule],
      providers: [
        { provide: ProjectService, useValue: projectServiceStub },
        { provide: ProjectApiService, useValue: projectApiServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ status: '', search: '' }) } },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(component.projectListRefresh, 'unsubscribe');
    spyOn(component.queryParamsSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.projectListRefresh.unsubscribe).toHaveBeenCalled();
    expect(component.queryParamsSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should initialize component with default values', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeFalse();
    expect(component.searchTerm).toBe('');
    expect(component.projectList).toEqual(new Map());
  });

  it('should display loading spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-spinner')).toBeTruthy();
  });

  it('should display projects when not loading', () => {
    component.projectList = new Map([['Customer A', mockProjects]]);
    component.loading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-expansion-panel')).toBeTruthy();
    expect(compiled.querySelector('strong').textContent).toContain('Customer A');
  });

  it('should display no projects message when search term is not found', () => {
    component.projectList = new Map();
    component.loading = false;
    component.searchTerm = 'Non-existent Project';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-message').textContent).toContain('No projects name "Non-existent Project" search not found!');
  });

});
