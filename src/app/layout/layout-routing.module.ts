import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { CreateUserComponent } from './createUser/createUser.component';
import { PermissionsGuard } from '../core/guards/permissions.guard';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent 
  },
  {
    path: 'create', 
    component: CreateUserComponent,
    canActivate: [PermissionsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
