import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';


@NgModule({
  declarations: [
    LayoutComponent, 
    LayoutNavBarComponent
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { } 
