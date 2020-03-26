import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutFormComponent } from './layout-form/layout-form.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    BsDatepickerModule.forRoot()
  ]
})
export class LayoutModule { } 
