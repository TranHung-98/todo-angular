import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { TodoApiApiService } from '../../services/todo-api.service';
import { ICountStatusTodo } from 'src/app/interfaces/count-status.interface';
import { ENotifyResponseApi, EStatusEnum } from 'src/app/enums/notiff-status.enum';
import { ToastService } from 'src/app/shared/components/toast/service/toast.service';
import { CreateOrEditTodoService } from '../create-or-edit-todo/service/create-or-edit-todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: ITodo[] = [];
  originalTodos: ITodo[] = [];
  todoToDeleteId: number = 0;
  confirmDeleteDialog: boolean = false;
  todoSubscription: Subscription | undefined;
  countStatusTodo: ICountStatusTodo = { countStatusAll: 0, countFailed: 0, countCompleted: 0 };

  private intervalId: number | undefined;
  private onDestroy$ = new Subject<void>();

  @Input() selectedStatus?: EStatusEnum;

  constructor(private todoApiService: TodoApiApiService, private toastService: ToastService,
    private todoService: TodoService, public createOrEditService: CreateOrEditTodoService) { }

  ngOnInit(): void {
    this.getAllTodos();
    this.startInterval();
    this.todoService.filterEvent$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((filterStatus: EStatusEnum) => {
        this.selectedStatus = filterStatus;
        this.filterStatus();
      });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getAllTodos(): void {
    this.todoApiService.getAll().subscribe({
      next: (todos: ITodo[]) => {
        this.originalTodos = todos;
        this.todos = this.filterTodos(this.originalTodos);
        this.countTodosWithStatus();
      },
      error: () => {
        const config = {
          title: ENotifyResponseApi.GetApiFail,
          icon: EStatusEnum.NotStarted,
        };
        this.toastService.open(config);
      }
    });
  }

  addTodo(formData: ITodo[]) {
    formData.forEach(todo => {
      this.todoApiService.postTodo(todo).subscribe({
        next: (newTodo) => {
          this.todos.push(newTodo);
          this.originalTodos.push(newTodo);
          this.countTodosWithStatus();
          const config = {
            title: ENotifyResponseApi.AddSuccess,
            icon: EStatusEnum.Completed,
          };
          this.toastService.open(config);
        },
        error: () => {
          const config = {
            title: ENotifyResponseApi.AddFail,
            icon: EStatusEnum.NotStarted,
          };
          this.toastService.open(config);
        }
      });
    });
  }

  updateTodoItem(updatedTodoItem: ITodo) {
    this.updateTodoItemViaApi(updatedTodoItem);
  }

  confirmDeleteTodo(todoId: number): void {
    this.todoToDeleteId = todoId;
    this.confirmDeleteDialog = true;
  }

  onConfirmed(confirmed: boolean, todoId: number): void {
    if (confirmed) {
      this.deleteTodoItem(todoId);
    } else {
      this.confirmDeleteDialog = false;
    }
    this.confirmDeleteDialog = false;
  }

  deleteTodoItem(todoId: number): void {
    this.todoApiService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(item => item.id.toString() !== todoId.toString());
        this.countTodosWithStatus();
        const config = {
          title: ENotifyResponseApi.DeleteSuccess,
          icon: EStatusEnum.Completed,
        };
        this.toastService.open(config);
      },
      error: () => {
        const config = {
          title: ENotifyResponseApi.DeleteFail,
          icon: EStatusEnum.NotStarted,
        };
        this.toastService.open(config);
      }
    });
  }

  toggleCheckbox(todoStatus: ITodo): void {
    todoStatus.isChecked = !todoStatus.isChecked;
    if (todoStatus.isChecked) {
      todoStatus.status = EStatusEnum.Completed;
    } else {
      todoStatus.status = EStatusEnum.NotStarted;
    }
    this.updateTodoItemViaApi(todoStatus);
  }

  filterStatus(): void {
    this.todos = this.filterTodos(this.originalTodos);
  }

  updateCountdown(): void {
    const currentTime = new Date().getTime();
    const currentHour = new Date().setHours(0, 0, 0, 0);
    const fiveMinutesInMilliseconds = 300000;
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

    this.todos.forEach(todo => {
      if (this.isCountdownApplicable(todo, currentTime, currentHour)) {

        const deadlineTime = new Date(todo.date).getTime();
        const timeRemaining = deadlineTime - currentTime;

        if (timeRemaining > 0) {
          if (timeRemaining > oneMonthInMilliseconds) {
            const months = Math.floor(timeRemaining / oneMonthInMilliseconds);
            const days = Math.floor((timeRemaining % oneMonthInMilliseconds) / (24 * 3600 * 1000));
            todo.countdown = `${months} months ${days} days`;
          } else if (timeRemaining > tenDaysInMilliseconds) {
            todo.countdown = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000)) + ' days';
          } else {
            todo.countdown = Math.floor(timeRemaining / 1000);

            if (timeRemaining <= fiveMinutesInMilliseconds && !todo.fiveNotificationSent) {
              todo.status = EStatusEnum.NotStarted;
              todo.fiveNotificationSent = true;
            }
          }
        } else {
          todo.countdown = 0;
        }
      }
    });
  }

  countTodosWithStatus(): void {
    this.countStatusTodo.countFailed = this.todos.filter(todo => todo.status === EStatusEnum.NotStarted).length;
    this.countStatusTodo.countCompleted = this.todos.filter(todo => todo.status === EStatusEnum.Completed).length;
    this.countStatusTodo.countStatusAll = this.todos.filter(todo => todo.status === EStatusEnum.Completed ||
      todo.status === EStatusEnum.NotStarted || todo.status === EStatusEnum.InProgress).length;
    this.todoService.emitCountStatus(this.countStatusTodo);
  }

  private updateTodoItemViaApi(updateTodoItem: ITodo): void {
    this.todoApiService.putTodo(updateTodoItem).subscribe({
      next: () => {
        this.todos = this.todos.map(todo => {
          if (todo.id === updateTodoItem.id) {
            return { ...todo, ...updateTodoItem };
          }
          return todo;
        });
        this.originalTodos = this.originalTodos.map(todo => {
          if (todo.id === updateTodoItem.id) {
            return { ...todo, ...updateTodoItem };
          }
          return todo;
        });

        this.countTodosWithStatus();
        const config = {
          title: ENotifyResponseApi.EditSuccess,
          icon: EStatusEnum.Completed,
        };
        this.toastService.open(config);
      },
      error: () => {
        const config = {
          title: ENotifyResponseApi.EditFail,
          icon: EStatusEnum.NotStarted,
        };
        this.toastService.open(config);
      }
    });
  }

  private filterTodos(todos: ITodo[]): ITodo[] {
    if (this.selectedStatus === EStatusEnum.All || this.selectedStatus === EStatusEnum.Status) {
      return todos.map(todo => {
        return {
          ...todo,
          isChecked: todo.isChecked || false,
        };
      });
    }

    let filteredTodos: ITodo[] = [];

    if (this.selectedStatus !== undefined) {
      filteredTodos = todos.filter(todo => todo.status === this.selectedStatus);
    } else {
      filteredTodos = [...todos];
    }

    return filteredTodos.map(todo => {
      return {
        ...todo,
        isChecked: todo.isChecked || false,
      };
    });
  }

  private isCountdownApplicable(todo: ITodo, currentTime: number, currentHour: number): boolean {
    return todo.status === EStatusEnum.InProgress ||
      todo.status === EStatusEnum.NotStarted ||
      new Date(todo.date).setHours(0, 0, 0, 0) === currentHour;
  }

  private startInterval(): void {
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000) as unknown as number;
  }

}
