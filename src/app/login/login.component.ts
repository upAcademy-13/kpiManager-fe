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

  public user: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.username = 'COO';
    this.user.password = 'COO123';
  }

  unauthorized;
  login() {
    this.auth.login(this.user).subscribe( res => {
      this.router.navigate(['layout']);
    }, 
    error => {
      this.unauthorized = "Username ou password incorrecta!";
    });
  }

}
