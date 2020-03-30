import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { CreateUserComponent } from './createUser/createUser.component';
import { PermissionsCOOGuard } from '../core/guards/permissionsCOO.guard';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent 
  },
  {
    path: 'create', 
    component: CreateUserComponent,
    canActivate: [PermissionsCOOGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
