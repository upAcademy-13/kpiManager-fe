import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutNavBarComponent } from './layout-nav-bar.component';


const routes: Routes = [
  { path: '', component: LayoutNavBarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutNavBarRoutingModule { }
