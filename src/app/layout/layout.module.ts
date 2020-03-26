import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { CreateUserComponent } from './createUser/createUser.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent, 
    LayoutNavBarComponent,
    CreateUserComponent
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ]
})
export class LayoutModule { } 
