import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from 'src/app/core/models/client';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { ManagersService } from 'src/app/core/services/managers.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-managers-client-management',
  templateUrl: './managers-client-management.component.html',
  styleUrls: ['./managers-client-management.component.scss']
})
export class ManagersClientManagementComponent implements OnInit {

  public clientsData: Client[] = [];
  public managersData: User[] = [];
  private apiUrl: 'http://localhost:8080/kpiManager/api';
  
  constructor(
    private clients: ClientsService,
    private managers: ManagersService,
    private http: HttpClient
  ) { 
      this.fetch(data => {
        this.rows = data;
        console.log(this.rows);
        
      }); 
}

  ngOnInit(): void {
    this.getAllClients();
    this.getAllManagers();
  }

  getAllClients() {
    this.clients.getAllClients(this.clientsData).subscribe((res:any) =>   {
      console.log('resultado', res);
      this.rows = [...res];
      this.columns = [{ prop: 'name' }, { name: 'NIPC' }, { name: 'Potential Revenue', sortable: false }, { name: 'Unit ID' }];
    });
  }

  getAllManagers() {
    this.managers.getAllManagers(this.managersData).subscribe((res:any) =>   {
      console.log('resultadoM', res);
      this.rows = [...res];
      this.columns = [{ prop: 'name' }, { name: 'Unit', sortable: false }];
    });
  }
  
  /* TABLE */
  temp = [];
  rows = [];
  reorderable = true;

  columns = [];

  ColumnMode = ColumnMode;

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8080/kpiManager/api/clients`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
