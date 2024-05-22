import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditTodoComponent } from './create-or-edit-todo.component';

describe('CreateOrEditTodoComponent', () => {
  let component: CreateOrEditTodoComponent;
  let fixture: ComponentFixture<CreateOrEditTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrEditTodoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
