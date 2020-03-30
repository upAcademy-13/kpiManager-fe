import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout-nav-bar',
  templateUrl: './layout-nav-bar.component.html',
  styleUrls: ['./layout-nav-bar.component.scss']
})
export class LayoutNavBarComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  tokenInfo;  
  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.tokenInfo = this.auth.getDecodedAccessToken(token); 
  }

}
