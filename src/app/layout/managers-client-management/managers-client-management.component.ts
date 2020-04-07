import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from 'src/app/core/models/client';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-managers-client-management',
  templateUrl: './managers-client-management.component.html',
  styleUrls: ['./managers-client-management.component.scss']
})
export class ManagersClientManagementComponent implements OnInit {

  public clientsData: Client[] = [];
  
  constructor(
    private clients: ClientsService
  ) { 
      this.fetch(data => {
        this.rows = data;
        setTimeout(() => {
          this.loadingIndicator = false;
        }, 1500);
      }); 
}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clients.getAllClients(this.clientsData).subscribe((res:any) =>   {
      console.log('resultado', res);
    });
  }
  
  /* TABLE */
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'name' }, { name: 'NIPC' }, { name: 'Potential Revenue', sortable: false }];

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
