import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutFormComponent } from './layout-form/layout-form.component';


const routes: Routes = [
  {
    path:'layoutform',
    component: LayoutFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
