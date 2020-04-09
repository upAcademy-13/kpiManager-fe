import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder } from '@angular/forms';
import { DataInteraction } from 'src/app/core/models/dataInteration';
import { ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TableComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  @Input() tempo$: Observable<any[]>;
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
  selectInteraction: string;
  selectBM: string;
  selectClient: string;
  selectUnit: string;
  selectWeek: string;
  apiUrl = 'http://127.0.0.1:8080/kpiManager/api/';

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'myColumn1',
    orderDir: 'desc',
    pageNumber: 0,
    size:5

  };

  ngOnInit() {
    this.pageCallback({ offset: 0 });
    console.log('ngOnInit - start')
    this.selectInteraction = !!window.history.state.selectInteraction ? window.history.state.selectInteraction : '';
    this.selectBM = !!window.history.state.selectBM ? window.history.state.selectBM : '';
    this.selectClient = !!window.history.state.selectClient ? window.history.state.selectClient : '';
    this.selectUnit = !!window.history.state.selectUnit ? window.history.state.selectUnit : '';
    this.selectWeek = !!window.history.state.selectWeek ? window.history.state.selectWeek : '';
    if (this.selectInteraction !== '' || this.selectUnit !== '' || this.selectUnit !== '' || this.selectWeek !== '' || this.selectClient) {
      this.filtrer();
    } else {
      this.reloadTable();
    }
    console.log('ngOnInit - fim')
  }

  constructor(
    private http: HttpClient,
    private data: DataService,
    private cdr: ChangeDetectorRef
  ) {

  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.reloadTable();
  }

  // sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
  //   // there will always be one "sort" object if "sortType" is set to "single"
  //   this.page.orderDir = sortInfo.sorts[0].dir;
  //   this.page.orderBy = sortInfo.sorts[0].prop;
  //   this.reloadTable();
  // }

  reloadTable() {

    // NOTE: those params key values depends on your API!
    let params = new HttpParams();

    params = params.append('startIndex', `${this.page.offset}`);
    params = params.append('quantity', `${this.page.limit}`);
    // .set('orderColumn', `${this.page.orderBy}`)
    // .set('orderDir', `${this.page.orderDir}`)


    this.tempo$ = this.http.get<any[]>(` http://127.0.0.1:8080/kpiManager/api/interactions/all/between`, { params })
    this.tempo$.subscribe((res) => {
      this.rows = [...res];
      this.temp = [...res];
      console.log("tempo, between", this.rows);
      this.table.offset = 0;
      this.cdr.detectChanges();
    })
  }

  refreshTable() {
    this.filterClearSelect();
    this.reloadTable();
    this.rows = this.temp;
  }

  // fetch(cb) {
  //   console.log('fetch - start')
  //   const req = new XMLHttpRequest();
  //   req.open('GET', '  http://127.0.0.1:8080/kpiManager/api/interactions/all');
  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };
  //   req.send();
  //   console.log('fetch - fim')
  // }

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

  filtrer() {

    this.rows = [];
    let myselectWeek, myselectUnit, myselectClient, myselectBM, myselectInteration;
    myselectBM = this.selectBM !== "" ? this.selectBM : null;
    myselectClient = this.selectClient !== "" ? this.selectClient : null;
    myselectUnit = this.selectUnit !== "" ? this.selectUnit : null;
    myselectWeek = this.selectWeek !== "" ? this.selectWeek : null;
    myselectInteration = this.selectInteraction !== "" ? this.selectInteraction : null;

    let params = new HttpParams();

    params = params.append('week', myselectWeek);
    params = params.append('unit', myselectUnit);
    params = params.append('client', myselectClient);
    params = params.append('businessManagers', myselectBM);
    params = params.append('interaction', myselectInteration);

    this.tempo$ = this.http.get<any[]>(this.apiUrl + 'interactions/filter', { params })
    this.tempo$.subscribe((res) => {
      this.rows = [...res];
      console.log("tempo, between", this.rows);
      this.table.offset = 0;
      this.cdr.detectChanges();
    })

    // this.filtro$ = this.http.get<any[]>(this.apiUrl + 'interactions/filter', {
    //   params: params
    // });
    // this.filtro$.subscribe((res) => {
    //   this.rows = [...res];
    //   console.log(this.rows);
    //   this.table.offset = 0;
    //   this.cdr.detectChanges();
    // })

    console.log('this.temp = ', this.temp);
  }

  filterClearSelect() {
    this.selectBM = "";
    this.selectClient = "";
    this.selectWeek = "";
    this.selectUnit = "";
    this.selectInteraction = "";

  }

}
