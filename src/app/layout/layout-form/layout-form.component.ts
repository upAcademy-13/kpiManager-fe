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
      interactionTemp:object;
      interactionTypeRow=[];


  constructor() { 
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }
  

  ngOnInit(): void {
  }
  addInteraction(){
    this.interactionTemp = {
      "name": this.selectClient, //vai ser o nome do cliente
      "interaction": this.selectType //vai ser o tipo da interacao
    }
    this.interactionTypeRow.push(this.interactionTemp);
    console.log(this.interactionTypeRow);
  }
  delRow(i:number){
    this.interactionTypeRow.splice(i, 1);
  }


}




   

