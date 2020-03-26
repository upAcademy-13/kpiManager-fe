import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    TableComponent
  
  ],
  imports: [
    CommonModule,
    // NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule
  ],
  exports:[
    TableComponent,
    
  ]
})
export class SharedModule { }
