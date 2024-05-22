import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ITodo, ITodo1 } from 'src/app/interfaces/todo.interface';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

@Injectable()
export class TodoApiApiService {
  constructor(private httpClient: HttpClient) { }

  getAllAndSomeOtherApiCall(): Observable<[ITodo[], ITodo1[]]> {

    return forkJoin([
      this.httpClient.get<ITodo[]>(environment.defaultUrl),
      this.httpClient.get<ITodo1[]>('https://66027ede9d7276a755535be2.mockapi.io/todos/todos')
    ]);
  }

  getAll(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(environment.defaultUrl);
  }

  postTodo(value: ITodo): Observable<ITodo> {
    return this.httpClient.post<ITodo>(environment.defaultUrl, value, httpOptions);
  }

  deleteTodo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.defaultUrl}/${id}`, httpOptions);
  }

  putTodo(value: ITodo): Observable<ITodo> {
    return this.httpClient.put<ITodo>(`${environment.defaultUrl}/${value.id}`, value, httpOptions);
  }
}
