import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';

const routes: Routes = [
  // {path: '**', redirectTo: 'dashboard'},
  {path: 'layout', component: LayoutNavBarComponent},
  {path: 'login', component: LoginComponent},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
