import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../core/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {
  public user: User = new User();
  postData;
  private apiUrl = 'http://localhost:8080/kpiManager/api/managers';
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.user.role = ""
  }

  submit(){
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
       console.log(this.user);
       this.http.post<any>(this.apiUrl,this.user,requestOptions).subscribe(data => {
         this.postData = "sucesso";
         console.log(this.user);
       },
       error =>{
         this.postData= "erro";
         console.log(error);
       });
  }

}
