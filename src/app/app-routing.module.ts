import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './layout/statistics/statistics.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
<<<<<<< HEAD
  // {path: 'login', component: LoginComponent},
  // {path: '**', redirectTo: 'login'},
 
   {
    path:"layout", component: LayoutNavBarComponent
   },
   

=======
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'layout', 
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), 
    canActivate: [AuthGuard] },
  {
     path: '**', 
     redirectTo: 'login' 
  },
>>>>>>> develop
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
