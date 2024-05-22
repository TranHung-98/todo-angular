import { Injectable } from '@angular/core';
import { ITodo } from 'src/app/interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateOrEditTodoService {

  constructor() { }
  isModalVisible: boolean = false;
  todoItem?: ITodo;

}
