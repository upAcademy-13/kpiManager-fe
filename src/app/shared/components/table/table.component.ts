import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder } from '@angular/forms';
import { DataInteraction } from 'src/app/core/models/dataInteration';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  @Input() data$: Observable<any[]>;
  @Input() dataWeek$: Observable<any[]>;
  @Input() dataClients$: Observable<any[]>;
  @Input() dataBManagers$: Observable<any[]>;
  @Input() dataInteractions$: Observable<any[]>;
  @Input() dataUnities$: Observable<any[]>;

  ColumnMode = ColumnMode;
  temp = [];
  rows = [];

  tableColumns = [
    {
      prop: 'dateInteraction',
      name: 'Semana'
    },
    {
      prop: 'unit',
      name: 'Unidade'
    },
    {
      prop: 'client',
      name: 'Cliente'
    },
    {
      prop: 'person',
      name: 'Business manager'
    },
    {
      prop: 'interactionType',
      name: 'Tipo de interação'
    }
  ]


  ngOnInit() {

    console.log(" TableComponent = ", this.data$)
    this.rows;

  }

  constructor() {
    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
      console.log(this.rows)

    });
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
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.person.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
    console.log("passou", this.rows)
  }

  uFilterBM(value: string) {
    if (value == 'myselectBM') {
      this.rows = this.temp;
      return;
    }
    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.person.name.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterInteration(value: string) {
    if (value == 'myselectInteration') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.interactionType.interactionType.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterClient(value: string) {
    if (value == 'myselectCliente') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.client.name.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterUnidade(value: string) {
    if (value == 'myselectUnidade') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.unit.nameUnit.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterSemana(value: string) {
    if (value == 'myselectSemana') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.dateInteraction.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }


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




}
