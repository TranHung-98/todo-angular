import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsEditOrCreateComponent } from './projects-edit-or-create.component';

describe('ProjectsEditOrCreateComponent', () => {
  let component: ProjectsEditOrCreateComponent;
  let fixture: ComponentFixture<ProjectsEditOrCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsEditOrCreateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsEditOrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
