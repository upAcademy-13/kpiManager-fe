import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User = new User();
 /*  private apiUrl = 'http://localhost:4200'; */  /* INTRODUZIR URL API */
  
  constructor(
    private http: HttpClient
  ) { }

/*   public login (user: User) {
    return this.http.get(this.apiUrl + '?filter={"where":{"username":"COO"}}');  /* VAI RETORNAR O OBJECT USER GUARDADO NA BASE DA DADOS */
/*   } */

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

getUnidade(){

return this.http.get("http://127.0.0.1:8080/kpiManager/api/interactions/allWeeks")

}

}
