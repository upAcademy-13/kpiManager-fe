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
  private apiUrl: 'http://localhost:8080/kpiManager/api';
  modalRef: BsModalRef;
  public units$: Observable<Object>;
  selectUnit: string;
  managerForm : FormGroup;
  isEdit : boolean = false;
  isCreate : boolean = false;
  clientForm : FormGroup;
  isManager : boolean = false;
  
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
        console.log(this.rows);
        
      }); 
}

  ngOnInit(): void {

    this.getFormData();
    this.managerForm = new FormGroup({
      name : new FormControl('',Validators.required),
      nipc : new FormControl('',Validators.required),
      unit : new FormGroup(
        {id: new FormControl('',Validators.required),
      })
    })
    this.clientForm = new FormGroup({
      name : new FormControl('',Validators.required),
      nipc : new FormControl('',Validators.required),
    })
  }

  getAllClients() {
    
    this.clients.getAllClients(this.clientsData).subscribe((res:any) =>   {
      console.log('resultado', res);
      this.rows = [...res];
      this.columns = [{ name: 'Name' }, { name: 'NIPC' }, {name: 'Actions'}];
      console.log(this.rows , " Clientes");
      this.isManager = false;
    });
  }

  getAllManagers() {
    
    this.managers.getAllManagers(this.managersData).subscribe((res:any) =>   {
      
      console.log('resultadoM', res);
      this.rows = [...res];
      this.columns = [{ name: 'Name' }, { name: 'Unit', sortable: false }, {name:'Actions'}];
      console.log(this.rows , " Managers");
      this.isManager = true;
    });
  }

  test(obj){
    console.log(obj);

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
/*   this.profileForm.reset(); */
  this.lgModal.hide();
}


@ViewChild('lgModal') public lgModal: ModalDirective;
public addClient(){
  
  this.http.post<any>(this.apiUrlClient,this.clientForm.value).subscribe(data => {
  },
  error => {
    console.log(error);
  });
  this.http.get(this.apiUrlClient ).subscribe(data =>{
  })
  this.clientForm.reset();
  this.lgModal.hide();

}
public add(){
  this.isEdit = true;
  this.isCreate = true;
  this.isManager = false;
  this.lgModal.show();
  let element: HTMLElement = document.getElementById('client') as HTMLElement;
  element.click();
}


public edit(row: any){
  this.isEdit = true;
  this.isCreate = true;
  this.lgModal.show();

  console.log(row);
/*   this.profileForm.patchValue({
name:    row.name,
nipc: row.nipc,
unit: row.unit
  }); */
}

public delete(row: any) {
  
}


}
