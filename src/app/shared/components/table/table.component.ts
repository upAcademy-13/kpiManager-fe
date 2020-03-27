import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  @Input() data$: Observable<any[]>;

  ColumnMode = ColumnMode;
  temp = [];
  rows = [];

  arrFiltrado = [];

  ngOnInit() {
    //console.log(" TableComponent = ", this.data$)
    this.rows;
    console.log(this.rows);

  }

  constructor() {
    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/statistics');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
    console.log("passou req", req)
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.businessManager.toLowerCase().indexOf(val) !== -1 || !val;
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
      return d.businessManager.indexOf(val) !== -1 || !val;
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
      return d.tipoDeInteracao.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterClient(value: string){
    if (value == 'myselectCliente') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.cliente.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterUnidade(value: string){
    if (value == 'myselectUnidade') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.unidade.indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  uFilterSemana(value: string){
    if (value == 'myselectSemana') {
      this.rows = this.temp;
      return;
    }

    const val = value;
    const temp = this.temp.filter(function (d) {
      return d.semana.indexOf(val) !== -1 || !val;
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
