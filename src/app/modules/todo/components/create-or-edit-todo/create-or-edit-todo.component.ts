import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionEditCreate } from 'src/app/constants/option.constant';
import { CreateOrEditTodoService } from './service/create-or-edit-todo.service';

@Component({
  selector: 'app-create-or-edit-todo',
  templateUrl: './create-or-edit-todo.component.html',
  styleUrls: ['./create-or-edit-todo.component.scss']
})
export class CreateOrEditTodoComponent implements OnChanges, OnInit {
  formTodo: FormGroup = new FormGroup({});
  selectOption = OptionEditCreate;
  errors: { todo: string, date: string, status: string } = { todo: '', date: '', status: '' };

  constructor(public createOrEditService: CreateOrEditTodoService, private fb: FormBuilder) { }

  @Input() getDataForm?: ITodo[];
  @Output() formData = new EventEmitter<ITodo[]>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateTodoItemEvent = new EventEmitter<ITodo>();
  @Input() dataTodoItem: ITodo | undefined = {
    id: "",
    todo: "",
    date: "",
    status: "",
    countdown: 0,
    isChecked: false,
    fiveNotificationSent: false,
    deadlineNotificationSent: false,
  };

  ngOnInit(): void {
    this.formTodo = this.fb.group({
      id: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      todo: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTodoItem'] && this.dataTodoItem) {
      const todoItem = this.dataTodoItem;

      this.formTodo.patchValue({
        id: todoItem.id,
        todo: todoItem.todo,
        date: todoItem.date,
        status: todoItem.status
      });
    }
  }

  get isModalVisible(): boolean {
    return this.createOrEditService.isModalVisible;
  }

  handleSubmitForm(): void {
    this.handleValidationForm();

    if (!Object.values(this.errors).some(error => error !== '')) {
      if (this.createOrEditService.todoItem) {
        const updateTodoItem: ITodo = {
          id: this.formTodo.value.id,
          todo: this.formTodo.value.todo,
          date: this.formTodo.value.date,
          status: this.formTodo.value.status,
          isChecked: this.formTodo.value.status === '1' ? true : false
        };

        this.updateTodoItemEvent.emit(updateTodoItem);
      } else {
        const todoData: ITodo = {
          id: '',
          todo: this.formTodo.value.todo,
          date: this.formTodo.value.date,
          status: this.formTodo.value.status,
          isChecked: this.formTodo.value.status === '1' ? true : false
        };
        this.getDataForm?.push(todoData);
        this.formData.emit([todoData]);
      }

      this.hideModal();
    }
  }

  hideModal(): void {
    this.formTodo.reset();
    this.closeModal.emit();
    this.clearErrorMessage('todo');
    this.clearErrorMessage('date');
    this.clearErrorMessage('status');
    this.createOrEditService.todoItem = undefined;
    this.createOrEditService.isModalVisible = false;
  }

  clearErrorMessage(fieldName: string): void {
    if (fieldName === 'todo') {
      this.errors.todo = '';
    } else if (fieldName === 'date') {
      this.errors.date = '';
    } else if (fieldName === 'status') {
      this.errors.status = '';
    }
  }

  handleValidationForm() {
    const todoControl = this.formTodo.get('todo');
    const dateControl = this.formTodo.get('date');
    const statusControl = this.formTodo.get('status');

    if (todoControl?.errors) {
      if (todoControl.errors['required']) {
        this.errors.todo = 'Title is required!';
      }
      if (todoControl.errors['minlength']) {
        this.errors.todo = 'Title must be at least 5 characters!';
      }
    }
    if (statusControl?.errors) {
      if (statusControl.errors['required']) {
        this.errors.status = 'Status date is required!';
      }
    }
    if (dateControl?.errors) {
      if (dateControl.errors['required']) {
        this.errors.date = 'Date is required!';
      }
    }
  }

}
