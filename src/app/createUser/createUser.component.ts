import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../core/models/user';
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
  private apiUrl = '';
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.user.role = ""
  }

  submit(){
       console.log(this.user);
       this.http.post<any>(this.apiUrl,this.user).subscribe(data => {
         this.postData = data;
       },
       error =>{
         this.postData= "erro";
       });
  }

}
