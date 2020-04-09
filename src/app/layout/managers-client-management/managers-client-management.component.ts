import { Component, OnInit, TemplateRef, NgModule, ViewChild  } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from 'src/app/core/models/client';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { ManagersService } from 'src/app/core/services/managers.service';
import { User } from 'src/app/core/models/user';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { InteractionsService } from 'src/app/core/services/interactions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    private http: HttpClient,
    private modalService: BsModalService,
    private interactionService: InteractionsService,

  ) { 
      this.fetch(data => {
        this.rows = data;
        console.log(this.rows);
        
      }); 
}

  ngOnInit(): void {

    this.getFormData();
    this.profileForm = new FormGroup({
      name : new FormControl('',Validators.required),
      nipc : new FormControl('',Validators.required),
     unit : new FormGroup(
       {id: new FormControl('',Validators.required),
     })
    })
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
  modalRef: BsModalRef;
  public units$: Observable<Object>;
  selectUnit: string;
  private apiUrlClient = 'http://localhost:8080/kpiManager/api/clients';
  public client: Client = new Client();
  name;
  nipc;
  unit;
profileForm : FormGroup;
  
  
  




  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  
public getFormData() {

  this.units$ = this.interactionService.getUnits();

  
}

@ViewChild('lgModal') public lgModal: ModalDirective;
public addClient(){
  
  this.http.post<any>(this.apiUrlClient,this.profileForm.value).subscribe(data => {
  },
  error => {
    console.log(error);
  });
  this.http.get(this.apiUrlClient ).subscribe(data =>{
  })
  this.lgModal.hide();
}


}
