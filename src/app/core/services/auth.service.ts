import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User = new User();
  private apiUrl = 'http://localhost:8080/kpiManager/api/users/auth?filter={"where":{"username":"COO"}}';
  
  constructor(
    private http: HttpClient
  ) { }

  postData;
  public login (user: User) {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.get(this.apiUrl, requestOptions);

/*     return this.http.post<any>(this.apiUrl, user, requestOptions).subscribe(data => {
      this.postData = "sucesso";
      console.log(user);
    },
    error =>{
      this.postData= "erro";
      console.log(error);
    }); */
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public isAuthenticated(): boolean {
    if (this.currentUser.id) {
      return true;
    } else {
      return false;
    }
  }

}
