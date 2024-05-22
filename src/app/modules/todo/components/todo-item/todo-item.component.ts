import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { CreateOrEditTodoService } from '../create-or-edit-todo/service/create-or-edit-todo.service';
import { EStatusEnum } from 'src/app/enums/notiff-status.enum';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  todoStatus = EStatusEnum;

  @Output() todoItemId: EventEmitter<number> = new EventEmitter<number>();
  @Output() todoStatusItem: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  constructor(private createOrEditService: CreateOrEditTodoService) { }

  confirmDelete(todoId: number): void {
    this.todoItemId.emit(todoId);
  }

  showModalAndLoadDataFrom(todoItem: ITodo): void {
    this.createOrEditService.isModalVisible = true;
    this.createOrEditService.todoItem = { ...todoItem };
  }

  toggleCheckbox(todoStatus: ITodo): void {
    this.todoStatusItem.emit(todoStatus);
  }
}
