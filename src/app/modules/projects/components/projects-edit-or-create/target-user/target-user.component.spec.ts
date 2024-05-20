import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetUserComponent } from './target-user.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TargetUserComponent', () => {
  let component: TargetUserComponent;
  let fixture: ComponentFixture<TargetUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetUserComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TargetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
