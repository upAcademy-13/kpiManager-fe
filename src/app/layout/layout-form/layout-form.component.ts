import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

@Component({
  selector: 'app-layout-form',
  templateUrl: './layout-form.component.html',
  styleUrls: ['./layout-form.component.scss']
})

export class LayoutFormComponent implements OnInit {

      bsInlineValue = new Date();
      bsInlineRangeValue: Date[];
      maxDate = new Date();
      selectClient: number; //id do cliente
      selectType: number; //id do tipo de interacao
      interactionTable=[];


  constructor() { 
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }
  

  ngOnInit(): void {
  }
  add(){
    alert(this.selectClient);
    alert(this.selectType);
    this.interactionTable.push(this.selectClient);
    console.log(this.interactionTable);
  }



}




   

