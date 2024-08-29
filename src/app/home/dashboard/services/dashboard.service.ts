import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListItem } from '../models/list.model';
import { TaskItem } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMainList(): Observable<ListItem[]> {
    return this.http
      .get<ListItem[]>(`${this.apiUrl}/mainList`)
      .pipe(catchError(this.handleError));
  }

  getLists(): Observable<ListItem[]> {
    return this.http
      .get<ListItem[]>(`${this.apiUrl}/lists`)
      .pipe(catchError(this.handleError));
  }

  getCompletedTasks(): Observable<TaskItem[]> {
    return this.http
      .get<TaskItem[]>(`${this.apiUrl}/compeleted`)
      .pipe(catchError(this.handleError));
  }

  addList(listItem: ListItem): Observable<ListItem> {
    return this.http
      .post<ListItem>(`${this.apiUrl}/lists`, listItem)
      .pipe(catchError(this.handleError));
  }

  addTask(taskItem: TaskItem): Observable<TaskItem> {
    return this.http
      .post<TaskItem>(`${this.apiUrl}/lists`, taskItem)
      .pipe(catchError(this.handleError));
  }
  getAllTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.apiUrl}/tasks`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
