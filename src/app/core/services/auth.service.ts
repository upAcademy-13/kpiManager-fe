import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string; 
  private currentUser: User = new User();
  private apiUrl = 'http://localhost:8080/kpiManager/api/users/auth';
  
  constructor(
    private http: HttpClient
  ) { }

  public login (user: User) {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post(this.apiUrl, user, requestOptions);
  }

  public setCurrentToken(res: string) {
    this.token = res;
  }

  public getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

}
