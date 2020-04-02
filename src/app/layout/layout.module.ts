import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutFormComponent } from './layout-form/layout-form.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    LayoutComponent, 
    LayoutNavBarComponent,
    LayoutFormComponent
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    SweetAlert2Module.forRoot()
  ]
})
export class LayoutModule { } 
