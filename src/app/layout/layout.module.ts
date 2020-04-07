import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LayoutRoutingModule } from './layout-routing.module';
import { CreateUserComponent } from './createUser/createUser.component';
import { LayoutFormComponent } from './layout-form/layout-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ManagersClientManagementComponent } from './managers-client-management/managers-client-management.component';
import { ModalModule } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';



@NgModule({
  declarations: [
    LayoutComponent, 
    LayoutNavBarComponent,
    CreateUserComponent,
    LayoutFormComponent,
    StatisticsComponent,
    ManagersClientManagementComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot()
  ]
})

export class LayoutModule { } 
