import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './createUser/createUser.component';


const routes: Routes = [
  {
    path: "createUser",
    component: CreateUserComponent
  },
  {
    path: "**",
    redirectTo: "createUser"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
