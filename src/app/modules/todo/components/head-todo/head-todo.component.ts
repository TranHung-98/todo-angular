import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { EStatusEnum } from 'src/app/enums/notiff-status.enum';
import { OptionFilter } from 'src/app/constants/option.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICountStatusTodo } from 'src/app/interfaces/count-status.interface';
import { CreateOrEditTodoService } from '../create-or-edit-todo/service/create-or-edit-todo.service';

@Component({
  selector: 'app-head-todo',
  templateUrl: './head-todo.component.html',
  styleUrls: ['./head-todo.component.scss'],
})
export class HeadTodoComponent implements OnInit, OnDestroy {
  selectOption = OptionFilter;
  formSelect: FormGroup = new FormGroup('');
  selected?: EStatusEnum;
  countStatusTodo: ICountStatusTodo = { countStatusAll: 0, countFailed: 0, countCompleted: 0 };

  private onDestroy$ = new Subject<void>();

  constructor(private createOrEditService: CreateOrEditTodoService, private todoService: TodoService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formSelect = this.fb.group({
      status: ['', Validators.required]
    });
    this.todoService.countStatus$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((countStatus: ICountStatusTodo) => {
        this.countStatusTodo = countStatus;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  filterStatus(): void {
    const status = this.selected = this.formSelect.value.status;
    this.todoService.emitFilterEvent(status);
  }

  showModal(): void {
    this.createOrEditService.isModalVisible = true;
  }
}
