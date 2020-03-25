import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-form',
  templateUrl: './layout-form.component.html',
  styleUrls: ['./layout-form.component.scss']
})
export class LayoutFormComponent implements OnInit {
      bsInlineValue = new Date();
      bsInlineRangeValue: Date[];
       maxDate = new Date();
  constructor() { 
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
  }
}
  // export class DemoDatepickerInlineComponent {
  //   bsInlineValue = new Date();
  //   bsInlineRangeValue: Date[];
  //   maxDate = new Date();
   
  //   constructor() {
  //     this.maxDate.setDate(this.maxDate.getDate() + 7);
  //     this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  //   }
  // }
