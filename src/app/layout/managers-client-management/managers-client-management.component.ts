import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from 'src/app/core/models/client';

@Component({
  selector: 'app-managers-client-management',
  templateUrl: './managers-client-management.component.html',
  styleUrls: ['./managers-client-management.component.scss']
})
export class ManagersClientManagementComponent implements OnInit {

  public clientsData: Client[] = [];
  
  constructor(
    private clients: ClientsService
  ) { }

  ngOnInit(): void {
    this.getAllClients();
  }
  getAllClients() {
    this.clients.getAllClients(this.clientsData).subscribe((res:any) =>   {
      console.log('resultado', res);
  });
}
  
  

}
