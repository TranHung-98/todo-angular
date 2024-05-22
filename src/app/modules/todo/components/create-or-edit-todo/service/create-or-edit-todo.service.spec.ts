import { TestBed } from '@angular/core/testing';

import { CreateOrEditTodoService } from './create-or-edit-todo.service';

describe('CreateOrEditTodoService', () => {
  let service: CreateOrEditTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrEditTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
