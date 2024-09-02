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
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMainList(): Observable<ListItem[]> {
    return this.http
      .get<ListItem[]>(`${this.baseUrl}/mainList`)
      .pipe(catchError(this.handleError));
  }

  getLists(): Observable<ListItem[]> {
    return this.http
      .get<ListItem[]>(`${this.baseUrl}/lists`)
      .pipe(catchError(this.handleError));
  }

  updateList(id: string, updatedList: ListItem): Observable<ListItem> {
    return this.http
      .put<ListItem>(`${this.baseUrl}/lists/${id}`, updatedList)
      .pipe(catchError(this.handleError));
  }
  addList(listItem: ListItem): Observable<ListItem> {
    return this.http
      .post<ListItem>(`${this.baseUrl}/lists`, listItem)
      .pipe(catchError(this.handleError));
  }

  deleteList(ListId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/lists/${ListId}`);
  }

  getCompletedTasks(): Observable<TaskItem[]> {
    return this.http
      .get<TaskItem[]>(`${this.baseUrl}/compeleted`)
      .pipe(catchError(this.handleError));
  }

  addTask(taskItem: TaskItem): Observable<TaskItem> {
    return this.http
      .post<TaskItem>(`${this.baseUrl}/tasks`, taskItem)
      .pipe(catchError(this.handleError));
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tasks/${taskId}`);
  }

  updateTask(taskId: string, updatedTask: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(
      `${this.baseUrl}/tasks/${taskId}`,
      updatedTask
    );
  }

  getAllTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.baseUrl}/tasks`);
  }

  getTasksByListId(listId: string): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.baseUrl}/tasks/query/${listId}`);
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
