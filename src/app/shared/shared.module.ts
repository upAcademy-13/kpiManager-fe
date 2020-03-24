import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableComponent
  
  ],
  imports: [
    CommonModule,
    // NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    TableComponent,
    
  ]
})
export class SharedModule { }
