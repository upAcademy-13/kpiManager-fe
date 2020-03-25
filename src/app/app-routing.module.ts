import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { LayoutFormComponent } from './layout-form/layout-form.component';


const routes: Routes = [
  {
    path:'layoutform',
    component: LayoutFormComponent
  }
=======
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
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
