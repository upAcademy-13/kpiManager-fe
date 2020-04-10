import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DatatableComponent, DataTableFooterComponent, DataTablePagerComponent } from '@swimlane/ngx-datatable';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder } from '@angular/forms';
import { DataInteraction } from 'src/app/core/models/dataInteration';
import { ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { Page } from 'src/app/core/models/Page';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TableComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  @Input() filtro$: Observable<Paginate>;
  @Input() data$: Observable<any[]>;
  @Input() dataWeek$: Observable<any[]>;
  @Input() dataClients$: Observable<any[]>;
  @Input() dataBManagers$: Observable<any[]>;
  @Input() dataInteractions$: Observable<any[]>;
  @Input() dataUnities$: Observable<any[]>;
  @Input() dataPagination$: Observable<Paginate>;


  ColumnMode = ColumnMode;
  temp = [];
  rows = [];
  inputSearch: string = "";
  selectInteraction: string;
  selectBM: string;
  selectClient: string;
  selectUnit: string;
  selectWeek: string;
  apiUrl = 'http://127.0.0.1:8080/kpiManager/api/';
  page = new Page();
  totalElements = 0;
  pageInfo = {
    offset: 0,
    limit: 10,
    count: 0,
  }



  ngOnInit() {
    console.log('ngOnInit - start')
    this.setPage({ offset: 0, limit: 10, count:0 });



    console.log('ngOnInit - fim')
  }

    constructor(
    private http: HttpClient,
    private data: DataService,
    private cdr: ChangeDetectorRef
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  refreshTable() {
    this.filterClearSelect();
    this.inputSearch = "";
    this.rows = this.temp;
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

  filter() {
console.log(this.pageInfo);

    this.rows = [];
    let myselectWeek, myselectUnit, myselectClient, myselectBM, myselectInteration;
    myselectBM = this.selectBM !== "" ? this.selectBM : null;
    myselectClient = this.selectClient !== "" ? this.selectClient : null;
    myselectUnit = this.selectUnit !== "" ? this.selectUnit : null;
    myselectWeek = this.selectWeek!== "" ? this.selectWeek :null;
    myselectInteration = this.selectInteraction !== "" ? this.selectInteraction : null;

    let params = new HttpParams();

    params = params.append('week', myselectWeek);
    params = params.append('unit', myselectUnit);
    params = params.append('client', myselectClient);
    params = params.append('businessManagers', myselectBM);
    params = params.append('interaction', myselectInteration);
    params = params.append('startIndex', this.pageInfo.offset.toString());
    params = params.append('quantity', this.pageInfo.limit.toString());

    this.filtro$ = this.http.get<Paginate>(this.apiUrl + 'interactions/filter', {
      params: params
    });
    this.filtro$.subscribe((res:Paginate) => {
      this.rows = [...res.elements];
      console.log(this.rows);
      this.totalElements = res.totalElements;
      this.table.offset = 0;
      this.cdr.detectChanges();
    })
  }

  filterClearSelect() {

    this.selectBM = "";
    this.selectClient="";
    this.selectWeek="";
    this.selectUnit="";
    this.selectInteraction="";
    //fazer o clear da paginacao para voltar à posicao 0 (pagina 1)
  }

  setPage(pageInfo: { count: number, limit: number, offset: number }){
    
    this.pageInfo = pageInfo;
    console.log("pageInfo", pageInfo);
    
    this.selectInteraction = !!window.history.state.selectInteraction ? window.history.state.selectInteraction : '';
    this.selectBM = !!window.history.state.selectBM ? window.history.state.selectBM : '';
    this.selectClient = !!window.history.state.selectClient ? window.history.state.selectClient : '';
    this.selectUnit = !!window.history.state.selectUnit ? window.history.state.selectUnit : '';
    this.selectWeek = !!window.history.state.selectWeek ? window.history.state.selectWeek : '';
    if (this.selectInteraction !== '' || this.selectUnit !== '' || this.selectUnit !== '' || this.selectWeek !== '' || this.selectClient) {
      this.filter();
    } else {
      this.fetch(data => {
        this.totalElements = data.length;
        // this.temp = [...data];
        // this.rows = this.temp;

        this.rows = [];
        let myselectWeek, myselectUnit, myselectClient, myselectBM, myselectInteration;
        myselectBM = this.selectBM !== "" ? this.selectBM : null;
        myselectClient = this.selectClient !== "" ? this.selectClient : null;
        myselectUnit = this.selectUnit !== "" ? this.selectUnit : null;
        myselectWeek = this.selectWeek!== "" ? this.selectWeek :null;
        myselectInteration = this.selectInteraction !== "" ? this.selectInteraction : null;

        let params = new HttpParams();
        console.log("offsetpageNumber = ",this.pageInfo.offset, "pageSize = ", pageInfo.limit, "count = ", pageInfo.count);
        
        params = params.append('week', myselectWeek);
        params = params.append('unit', myselectUnit);
        params = params.append('client', myselectClient);
        params = params.append('businessManagers', myselectBM);
        params = params.append('interaction', myselectInteration);
        params = params.append('startIndex', this.pageInfo.offset.toString());
        params = params.append('quantity', this.pageInfo.limit.toString());
    
        this.dataPagination$ = this.http.get<Paginate>(this.apiUrl + 'interactions/filter', { params: params });
        
        this.dataPagination$.subscribe((res:Paginate) => {
        console.log("dataPagination = ", res);
        this.temp = [...res.elements];
        this.rows = this.temp;
        console.log("rows aqui =",this.rows);
        this.table.offset = 0;
        this.page.size = pageInfo.limit;
        this.totalElements = res.totalElements;
        this.page.pageNumber = pageInfo.offset;
        this.cdr.detectChanges();
      })
      })
    }


  }

}


export interface Paginate {

  elements: Object[];
  totalElements: number;
  
} 

