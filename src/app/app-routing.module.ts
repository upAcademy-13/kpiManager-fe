import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'layout', 
    loadChildren: () => import('./layout-nav-bar/layout-nav-bar.module').then(m => m.LayoutNavBarModule),
    canActivate: [AuthGuard]
  },
  {
     path: '**', 
     redirectTo: 'login' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
