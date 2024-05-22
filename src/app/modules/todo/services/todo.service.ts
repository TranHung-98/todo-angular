import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EStatusEnum } from 'src/app/enums/notiff-status.enum';
import { ICountStatusTodo } from 'src/app/interfaces/count-status.interface';

@Injectable()
export class TodoService {
  private filterEventSubject = new Subject<EStatusEnum>();
  private countStatusSubject = new Subject<ICountStatusTodo>();

  filterEvent$ = this.filterEventSubject.asObservable();
  countStatus$ = this.countStatusSubject.asObservable();

  emitFilterEvent(selectedStatus: EStatusEnum): void {
    this.filterEventSubject.next(selectedStatus);
  }

  emitCountStatus(countStatus: ICountStatusTodo): void {
    this.countStatusSubject.next(countStatus);
  }

  destroy(): void {
    this.filterEventSubject.complete();
    this.countStatusSubject.complete();
  }
}
