import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-nav-bar',
  templateUrl: './layout-nav-bar.component.html',
  styleUrls: ['./layout-nav-bar.component.scss']
})
export class LayoutNavBarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  username;
  tokenInfo;  
  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.tokenInfo = this.auth.getDecodedAccessToken(token); 
    this.username = this.tokenInfo['iss'];
    
  }

  logOut(){
    localStorage.removeItem('token');
    this.auth.setCurrentToken("");
    this.router.navigate(['/login']);
  }

}