import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HeadTodoComponent } from './components/head-todo/head-todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ConfirmTodoComponent } from './components/confirm-delete-todo/confirm-delete-todo.component';
import { CreateOrEditTodoComponent } from './components/create-or-edit-todo/create-or-edit-todo.component';
import { TodoApiApiService } from './services/todo-api.service';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    TodoComponent,
    TodoItemComponent,
    HeadTodoComponent,
    TodoListComponent,
    ConfirmTodoComponent,
    CreateOrEditTodoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [TodoApiApiService, TodoService],
  exports: [TodoComponent],
  bootstrap: [TodoComponent],
})
export class TodoModule { }
