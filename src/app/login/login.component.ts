import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.username = 'COO';
    this.user.password = 'COO123';
  }

  login() {
    console.log('login', this.user);
   /*  this.auth.login(this.user).subscribe( res => {
      console.log('resultado', res);
    }); */
    this.router.navigate(['layout']);
    
  }

}
