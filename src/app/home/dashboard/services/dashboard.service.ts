import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getMainList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/mainList');
  }

  getLists(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/lists');
  }

  compeletedTask(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/compeleted');
  }
}
