import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LayoutNavBarComponent } from '../layout-nav-bar/layout-nav-bar.component';


const routes: Routes = [
  {
    path: "", component:LayoutComponent,
    children: [
      {
 
        path: 'statistics',
        component: StatisticsComponent
      },
       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
