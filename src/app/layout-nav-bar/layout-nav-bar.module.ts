import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutNavBarRoutingModule } from './layout-nav-bar-routing.module';
import { LayoutNavBarComponent } from './layout-nav-bar.component';


@NgModule({
  declarations: [LayoutNavBarComponent],
  imports: [
    CommonModule,
    LayoutNavBarRoutingModule
  ]
})
export class LayoutNavBarModule { }
