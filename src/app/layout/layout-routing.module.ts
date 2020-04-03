import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CreateUserComponent } from './createUser/createUser.component';
import { PermissionsCOOGuard } from '../core/guards/permissionsCOO.guard';
import { LayoutFormComponent } from './layout-form/layout-form.component';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent, 
    children: [
      {
        path: 'create', 
        component: CreateUserComponent,
        canActivate: [PermissionsCOOGuard],
      },
      {
        path:'layoutform',
        component: LayoutFormComponent
      },
      {
        path: '', 
        redirectTo: 'layoutform',
        pathMatch: "full" 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
