import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../core/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {
  public user: User = new User();
  
  constructor() { }

  ngOnInit(): void {
    this.user.role = ""
  }

  submit(){
       console.log(this.user);
  }

}
