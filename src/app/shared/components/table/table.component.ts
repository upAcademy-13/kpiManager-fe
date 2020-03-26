import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {

 
  // @ViewChild('search', { static: false }) search: any;
  @Input() data$: Observable <any[]>;
  httpClient: any;
  public temp: Array<object> = [];
  public rows: Array<object> = [];
  public columns: Array<object>;
  // @Input()  headers=[];

  // page = 1;
  // pageSize = 4;
  // public array=[
  //   "semana",
  //   "unidade",
  //   "businessManager",
  //   "cliente",
  //   "tipoDeInteracao",
  //   "numerodeInteracoes"
  // ];

  // updateFilter(val: any) {
  //   const value = val.toString().toLowerCase().trim();
  //   // get the amount of columns in the table
  //   const count = this.columns.length;
  //   // get the key names of each column in the dataset
  //   const keys = Object.keys(this.temp[0]);
  //   // assign filtered matches to the active datatable
  //   this.rows = this.temp.filter(item => {
  //     // iterate through each row's column data
  //     for (let i = 0; i < count; i++) {
  //       // check for a match
  //       if (
  //         (item[keys[i]] &&
  //           item[keys[i]]
  //             .toString()
  //             .toLowerCase()
  //             .indexOf(value) !== -1) ||
  //         !value
  //       ) {
  //         // found match, return true to add to result set
  //         return true;
  //       }
  //     }
  //   });

  //   // Whenever the filter changes, always go back to the first page
  //   // this.table.offset = 0;
  // }

  // findAll() {
  //  this.httpClient.get('./assets/data/company.json').subscribe(
  //     (data: any) => {
  //       // cache our list
  //       this.temp = data;

  //       // push our inital complete list
  //       this.rows = [...this.temp];
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log (err.message);
  //     }
  //   );
  // }
  // constructor() { }

  ngOnInit() {
    console.log(" TableComponent = ", this.data$)
  }

  // temp = [];
  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();

  //   // filter our data
  //   const temp = this.temp.filter(function(d) {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });

  //   // update the rows
  //   this.rows = temp;
  //   console.log(this.temp)

  // }
 
  // rows = [];

 
  // ngOnInit() {

    
  //   this.fetch((data) => {
  //     this.data$ = data;
  //     console.log(this.data$)
  //   });


  // }

  
 
  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`)
  //   req.onload = () => {
  //     const data = JSON.parse(req.response);
  //     cb(data);
  //   };
 
  //   req.send();
  // }
}
