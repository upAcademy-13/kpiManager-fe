import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './layout/statistics/statistics.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  // {path: '**', redirectTo: 'login'},
 
   {
    path:"layout", component: LayoutNavBarComponent
   },
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
