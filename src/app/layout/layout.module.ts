import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { LayoutRoutingModule } from './layout-routing.module';

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
