import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  private apiUrl = 'http://localhost:8080/kpiManager/api/users/managers';

  constructor(
    private http: HttpClient
  ) { }

  public getAllManagers(users: User[], params: HttpParams) {
    return this.http.get<User[]>(this.apiUrl, {params});
  }
}
