import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder } from '@angular/forms';
import { DataInteraction } from 'src/app/core/models/dataInteration';
import { ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TableComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  @Input() filtro$: Observable<any[]>;
  @Input() data$: Observable<any[]>;
  @Input() dataWeek$: Observable<any[]>;
  @Input() dataClients$: Observable<any[]>;
  @Input() dataBManagers$: Observable<any[]>;
  @Input() dataInteractions$: Observable<any[]>;
  @Input() dataUnities$: Observable<any[]>;

  ColumnMode = ColumnMode;
  temp = [];
  rows = [];
  isFiltro: boolean = false;
  inputSearch: string = "";
  selectInteraction = "";

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router) 
    {
    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
      console.log(this.rows)

    });
  }
  ngOnInit() {
     this.rows;    
     this.selectInteraction = window.history.state.selectInteraction; 
  }

  apiUrl = 'http://127.0.0.1:8080/kpiManager/api/';


  refreshTabela()
  {
    this.isFiltro = false;
    this.data.getAllData().subscribe(res => {
      console.log('AllData = ', res);
      this.temp = [...res];
    });
    this.rows = this.temp;
    this.filterClearSelect();
    
  }


  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', '  http://127.0.0.1:8080/kpiManager/api/interactions/all');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
    console.log("passou req", req)
  }

  updateFilter(event) {
    this.isFiltro = false;
    this.filterClearSelect();
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.person.name.toLowerCase().indexOf(val) !== -1 || d.client.name.toLowerCase().indexOf(val) !== -1 ||
        d.unit.nameUnit.toLowerCase().indexOf(val) !== -1 || d.dateInteraction.toLowerCase().indexOf(val) !== -1 ||
        d.interactionType.interactionType.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
    console.log("passou", this.rows)
  }

  // uFilterBM(value: string) {
  //   if (value == 'myselectBM') {
  //     this.rows = this.temp;
  //     return;
  //   }
  //   const val = value;
  //   const temp = this.temp.filter(function (d) {
  //     return d.person.name.indexOf(val) !== -1 || !val;
  //   });

  //   this.rows = temp;
  //   this.table.offset = 0;
  // }

  // uFilterInteration(value: string) {
  //   if (value == 'myselectInteration') {
  //     this.rows = this.temp;
  //     return;
  //   }

  //   const val = value;
  //   const temp = this.temp.filter(function (d) {
  //     return d.interactionType.interactionType.indexOf(val) !== -1 || !val;
  //   });

  //   this.rows = temp;
  //   this.table.offset = 0;
  // }

  // uFilterClient(value: string) {
  //   if (value == 'myselectCliente') {
  //     this.rows = this.temp;
  //     return;
  //   }

  //   const val = value;
  //   const temp = this.temp.filter(function (d) {
  //     return d.client.name.indexOf(val) !== -1 || !val;
  //   });

  //   this.rows = temp;
  //   this.table.offset = 0;
  // }

  // uFilterUnidade(value: string) {
  //   if (value == 'myselectUnidade') {
  //     this.rows = this.temp;
  //     return;
  //   }

  //   const val = value;
  //   const temp = this.temp.filter(function (d) {
  //     return d.unit.nameUnit.indexOf(val) !== -1 || !val;
  //   });

  //   this.rows = temp;
  //   this.table.offset = 0;
  // }

  // uFilterSemana(value: string) {
  //   if (value == 'myselectSemana') {
  //     this.rows = this.temp;
  //     return;
  //   }

  //   const val = value;
  //   const temp = this.temp.filter(function (d) {
  //     return d.dateInteraction.indexOf(val) !== -1 || !val;
  //   });

  //   this.rows = temp;
  //   this.table.offset = 0;
  // }

  filtro() {
    document.querySelector('input').value = "";
    
    this.isFiltro = true;
    this.rows = [];
    let myselectSemana, myselectUnidade, myselectCliente, myselectBM, myselectInteration;

    var select = document.querySelectorAll('select');

    myselectSemana = select[0].selectedIndex > 0 ? select[0].value : null; //semana
    myselectUnidade = select[1].selectedIndex > 0 ? select[1].value : null; //unicade
    myselectCliente = select[2].selectedIndex > 0 ? select[2].value : null; //cliente
    myselectBM = select[3].selectedIndex > 0 ? select[3].value : null; //BM
    myselectInteration = select[4].selectedIndex > 0 ? select[4].value : null; //TP


    let params = new HttpParams();
   

    params = params.append('sel0', myselectSemana);
    params = params.append('sel1', myselectUnidade);
    params = params.append('sel2', myselectCliente);
    params = params.append('sel3', myselectBM);
    params = params.append('sel4', myselectInteration);

    this.filtro$ = this.http.get<any[]>(this.apiUrl + 'interactions/filtro', {
      params: params
    }
    );

    this.table.offset = 0;
    console.log('this.temp = ', this.temp);
    console.log(myselectInteration);
    
  }

  filterClearSelect(){
    var select = document.querySelectorAll('select');
    select[0].selectedIndex = 0;
    select[1].selectedIndex = 0;
    select[2].selectedIndex = 0;
    select[3].selectedIndex = 0;
    select[4].selectedIndex = 0;
    this.isFiltro = false;
  }


}
