import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewTasksComponent } from './project-view-tasks.component';

describe('ProjectViewTasksComponent', () => {
  let component: ProjectViewTasksComponent;
  let fixture: ComponentFixture<ProjectViewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectViewTasksComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectViewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
