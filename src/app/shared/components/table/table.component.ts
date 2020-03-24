import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {

  @Input() data$: Observable <any[]>;
  @Input()  headers=[];

  public array=[
    "semana",
    "unidade",
    "businessManager",
    "cliente",
    "tipoDeInteracao",
    "numerodeInteracoes"
  ];

  page = 2;
  pageSize = 4;
  
  constructor() { }

  ngOnInit() {
    console.log(" TableComponent = ", this.data$)
  }

}
