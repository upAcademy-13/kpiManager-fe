import { Component, OnInit, TemplateRef, NgModule, ViewChild  } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from 'src/app/core/models/client';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { ManagersService } from 'src/app/core/services/managers.service';
import { User } from 'src/app/core/models/user';
import { BsModalService, BsModalRef, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { InteractionsService } from 'src/app/core/services/interactions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-managers-client-management',
  templateUrl: './managers-client-management.component.html',
  styleUrls: ['./managers-client-management.component.scss']
})

export class ManagersClientManagementComponent implements OnInit {

  public clientsData: Client[] = [];
  public managersData: User[] = [];
  private apiUrlUpdManagers = 'http://localhost:8080/kpiManager/api/users/';
  private apiUrlUpdClient = 'http://localhost:8080/kpiManager/api/clients/';
  modalRef: BsModalRef;
  public units$: Observable<Object>;
  selectUnit: string;
  managerForm : FormGroup;
  isEdit : boolean = false;
isCreate : boolean = false;
clientForm : FormGroup;
isManager : boolean = false;
formSelected : FormGroup;
currentType: string;
postData;
  
  constructor(
    private clients: ClientsService,
    private managers: ManagersService,
    private http: HttpClient,
    private modalService: BsModalService,
    private interactionService: InteractionsService,

  ) { 
      this.fetch(data => {
        this.rows = data;
        this.columns = [{ name: 'Name' }, { name: 'NIPC' }, {name: 'Actions'}]
        
      }); 
}

  ngOnInit(): void {

    this.getFormData();
    this.managerForm = new FormGroup({
      id : new FormControl(''),
      name : new FormControl('',Validators.required),
      unit : new FormGroup(
        {id: new FormControl('',Validators.required),
      })
    })
    this.clientForm = new FormGroup({
      id: new FormControl(''),
      name : new FormControl('',Validators.required),
      nipc : new FormControl('',Validators.required),
    })
  }

  getAllClients() {
    
    this.clients.getAllClients(this.clientsData).subscribe((res:any) =>   {
      this.rows = [...res];
      this.columns = [{ name: 'Name' }, { name: 'NIPC' }, {name: 'Actions'}];
      this.isManager = false;
    });
  }

  getAllManagers() {
    
    this.managers.getAllManagers(this.managersData).subscribe((res:any) =>   {
    
      this.rows = [...res];
      this.columns = [{ name: 'Name' }, { name: 'Unit', sortable: false }, {name:'Actions'}];
      this.isManager = true;
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

  private apiUrlClient = 'http://localhost:8080/kpiManager/api/clients';
  public client: Client = new Client();


  


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  
public getFormData() {

  this.units$ = this.interactionService.getUnits();

  
}

public hide(){
  this.clientForm.reset();
  this.lgModal.hide();
  this.postData = "";
}


@ViewChild('lgModal') public lgModal: ModalDirective;
public addClient(row){
  const requestOptions: Object = {
    responseType: 'text'
  }

  
  this.http.post<any>(this.apiUrlClient,this.clientForm.value,requestOptions).subscribe(data => {
    this.clientForm.reset();
  this.lgModal.hide();
  let element: HTMLElement = document.getElementById('client') as HTMLElement;
  element.click();
  },
  error => {
    this.postData = error['error'];
  });
  
  

}

id;
public editUser(){
  const requestOptions: Object = {
    responseType: 'text'
  }
  if(this.isManager == true){
    this.id = this.managerForm.get('id').value;
    this.http.put(this.apiUrlUpdManagers + this.id,this.managerForm.value,requestOptions).subscribe(data => {
      this.managerForm.reset();
    this.lgModal.hide();
    let element: HTMLElement = document.getElementById('manager') as HTMLElement;
    element.click();
    },
    error => {
      this.postData = error['error'];
    });
  }
  else{
    this.id = this.clientForm.get('id').value;
    this.http.put(this.apiUrlUpdClient + this.id,this.clientForm.value,requestOptions).subscribe(data => {
      this.clientForm.reset();
    this.lgModal.hide();
    let element: HTMLElement = document.getElementById('client') as HTMLElement;
    element.click();
    },
    error => {
      this.postData = error['error'];
    });
  }
  
  
  

}

public add(){
  let element: HTMLElement = document.getElementById('client') as HTMLElement;
  element.click();
  this.isEdit = false;
  this.isCreate = true;
  this.isManager = false;
  this.lgModal.show();
  
}


public edit(row: any){
  this.isEdit = true;
  this.isCreate = false;
  this.lgModal.show();

  if(this.isManager == true){
    this.currentType = 'Manager'
    this.managerForm.patchValue({
      id: row.id,
      name: row.name,
      nipc: row.nipc,
      unit: row.unit
        });
        console.log(this.managerForm.value)
  }
  else{
    this.currentType = 'Client'
    this.clientForm.patchValue({
      id : row.id,
      name: row.name,
      nipc: row.nipc,
        });
  }
  
}


}
