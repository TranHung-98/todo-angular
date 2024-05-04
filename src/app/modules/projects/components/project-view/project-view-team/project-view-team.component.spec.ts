import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewTeamComponent } from './project-view-team.component';

describe('ProjectViewTeamComponent', () => {
  let component: ProjectViewTeamComponent;
  let fixture: ComponentFixture<ProjectViewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectViewTeamComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
