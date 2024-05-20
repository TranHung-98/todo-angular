import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerProjectComponent } from './manager-project.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { ProjectApiService } from '../../service/project-api.service';
import { BehaviorSubject, of } from 'rxjs';
import { EStatusFilter, EStatusFilterQueryParams } from 'src/app/enums/status-filter.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



describe('ManagerProjectComponent', () => {
  let component: ManagerProjectComponent;
  let fixture: ComponentFixture<ManagerProjectComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let projectServiceStub: Partial<ProjectService>;
  let projectApiServiceStub: Partial<ProjectApiService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { queryParams: of({}) });

    projectServiceStub = {
      refreshProjectList$: new BehaviorSubject<boolean>(true)
    };

    projectApiServiceStub = {
      getQuantityProjects: jasmine.createSpy('getQuantityProjects').and.returnValue(of({ result: [{ quantity: 10, status: 1 }] }))
    };

    await TestBed.configureTestingModule({
      declarations: [ManagerProjectComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ProjectService, useValue: projectServiceStub },
        { provide: ProjectApiService, useValue: projectApiServiceStub },
        TranslateService
      ],
      imports: [
        TranslateModule.forRoot(),
        MatMenuModule,
        NoopAnimationsModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve quantity projects on initialization', () => {
    expect(projectApiServiceStub.getQuantityProjects).toHaveBeenCalled();
    expect(component.quantityProjects.length).toBe(2);
  });

  it('should unsubscribe onDestroy', () => {
    spyOn(component.destroy$, 'next');
    spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

  it('should handle search change with debounce', (done) => {
    spyOn(component, 'handleFilter');
    component.onSearchChange();

    setTimeout(() => {
      expect(component.handleFilter).toHaveBeenCalled();
      done();
    }, 600);
  });

  it('should handle filter', () => {
    component.selectedFilter = EStatusFilter.ACTIVE;
    component.searchTerm = 'test';
    component.handleFilter();
    expect(routerSpy.navigate).toHaveBeenCalledWith([], {
      relativeTo: activatedRouteSpy,
      queryParams: {
        status: EStatusFilterQueryParams.ACTIVE,
        search: 'test',
      },
      queryParamsHandling: 'merge',
    });
  });

});
