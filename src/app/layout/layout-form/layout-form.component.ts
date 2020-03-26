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
      dateChoose = "";
      cliente = "";
      

  constructor() { 
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }
  

  ngOnInit(): void {
  }

public getValues(){
  console.log(this.cliente);
  console.log(this.maxDate);
  }

  testarPrintDate(tcode: string){
    console.log("Data escolhida " + tcode);
    let newDate = tcode.split(" ");
    let dataInicio = newDate[0]
    let dataFinal = newDate[2]
    console.log("Data de inicio: " + dataInicio);
    console.log("Data final: " + dataFinal);
  }
}


