import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-todo',
  templateUrl: './confirm-delete-todo.component.html',
  styleUrls: ['./confirm-delete-todo.component.scss'],
})
export class ConfirmTodoComponent {
  constructor() { }

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirmDelete() {
    this.confirmed.emit(true);
  }

  confirmBack(): void {
    this.confirmed.emit(false);
  }
}
