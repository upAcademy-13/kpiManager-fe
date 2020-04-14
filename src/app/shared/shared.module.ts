import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    TableComponent
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    MatTabsModule
  ],
  exports:[
    TableComponent,
    
  ]
})
export class SharedModule { }
