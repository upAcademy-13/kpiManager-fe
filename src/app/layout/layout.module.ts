import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';



@NgModule({
  declarations: [
    LayoutComponent,
    StatisticsComponent,
    LayoutNavBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})

export class LayoutModule { } 
