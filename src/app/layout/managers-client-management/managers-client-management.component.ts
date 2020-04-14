import { Component, OnInit, TemplateRef, NgModule, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from 'src/app/core/models/client';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ManagersService } from 'src/app/core/services/managers.service';
import { User } from 'src/app/core/models/user';
import { BsModalService, BsModalRef, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { InteractionsService } from 'src/app/core/services/interactions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Page } from './page';
import { isEmpty } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-managers-client-management',
  templateUrl: './managers-client-management.component.html',
  styleUrls: ['./managers-client-management.component.scss']
})

export class ManagersClientManagementComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  pageInfo = {
    offset : 0,
    limit : 5,
    count : 0
  };
  page : Page = new Page();
  public clientsData: Client[] = [];
  public managersData: User[] = [];
  private apiUrlUpdManagers = 'http://localhost:8080/kpiManager/api/users/';
  private apiUrlUpdClient = 'http://localhost:8080/kpiManager/api/clients/';
  modalRef: BsModalRef;
  public units$: Observable<Object>;
  selectUnit: string;
  managerForm: FormGroup;
  isEdit: boolean = false;
  isCreate: boolean = false;
  clientForm: FormGroup;
  isManager: boolean = false;
  formSelected: FormGroup;
  currentType: string;
  postData;
  id;
  tokenInfo;

  constructor(
    private clients: ClientsService,
    private managers: ManagersService,
    private http: HttpClient,
    private modalService: BsModalService,
    private interactionService: InteractionsService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.getAllClients(false);    
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.tokenInfo = this.auth.getDecodedAccessToken(token);
    this.getFormData();
    this.page.size = 5;
    this.page.pageNumber = 0;
    this.managerForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl('', Validators.required),
      unit: new FormGroup(
        {
          id: new FormControl('', Validators.required),
        })
    })
    this.clientForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      nipc: new FormControl('', [Validators.required,Validators.max(999999999), Validators.min(100000000)]),
    })
  }

  setPage(event){
this.pageInfo = event;
if(this.isManager == true)
{

  this.getAllManagers(false);

}
else{
  this.getAllClients(false); 
  
}
  }


  //Function to Add client data to Table
  getAllClients(toFirstPage : boolean) {
    if(toFirstPage){
      this.pageInfo.offset = 0;
      this.table.offset = 0;
      this.search.nativeElement.value ="";
    }
    
    let httpParams = new HttpParams();
    let pageNum = this.pageInfo.offset * this.pageInfo.limit;
    httpParams = httpParams.append('startIndex', pageNum.toString()); 
    httpParams = httpParams.append('quantity', '5');

    this.clients.getCount(this.clientsData, httpParams).subscribe((res: any) => {
          const data = res.elements.map(element => {
        return {
            ...element[0],
            count: element[1]
        }
      });    
      this.page.totalElements = res.totalElements;
      this.temp = [...data];
      this.rows = [...data];  
      this.columns = [{ name: 'Name' }, { name: 'NIPC' }, { name: 'Actions' }];
      this.isManager = false
    });
  }
  
  //Function to Add manager data to Table 
  getAllManagers(toFirstPage : boolean) {
    if(toFirstPage){
      this.pageInfo.offset = 0;
      this.table.offset = 0;
      this.search.nativeElement.value ="";
    }
    
    let httpParams = new HttpParams();
    let pageNum = this.pageInfo.offset * this.pageInfo.limit;
  httpParams = httpParams.append('startIndex', pageNum.toString()); 
  httpParams = httpParams.append('quantity', '5');

    this.managers.getAllManagers(this.managersData, httpParams).subscribe((res: any) => {

        const data = res.elements; 

        this.page.totalElements = res.totalElements;
        this.temp = [...data];
        this.rows = [...data];
        this.columns = [{ name: 'Name' }, { name: 'Unit', sortable: false }, { name: 'Actions' }];
        this.isManager = true;
    
      
    });

  }



  /* TABLE */
  temp = [];
  rows = [];
  reorderable = true;

  columns = [];

  ColumnMode = ColumnMode;


  private apiUrlClient = 'http://localhost:8080/kpiManager/api/clients';
  public client: Client = new Client();





  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  public getFormData() {

    this.units$ = this.interactionService.getUnits();
  }

  //Hide Modal and reset
  public hide() {
    this.clientForm.reset();
    this.lgModal.hide();
    this.postData = "";
  }


  //Add client
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public addClient() {
    const requestOptions: Object = {
      responseType: 'text'
    }


    this.http.post<any>(this.apiUrlClient, this.clientForm.value, requestOptions).subscribe(data => {
      this.clientForm.reset();
      this.lgModal.hide();
      this.getAllClients(true);
    },
      error => {
        this.postData = error['error'];
      });



  }


  //Edit User

  public editUser() {
    const requestOptions: Object = {
      responseType: 'text'
    }
    if (this.isManager == true) {
      this.id = this.managerForm.get('id').value;
      this.http.put(this.apiUrlUpdManagers + this.id, this.managerForm.value, requestOptions).subscribe(data => {
        this.managerForm.reset();
        this.lgModal.hide();
        this.getAllManagers(true);
      },
        error => {
          this.postData = error['error'];
        });
    }
    else {
      this.id = this.clientForm.get('id').value;
      this.http.put(this.apiUrlUpdClient + this.id, this.clientForm.value, requestOptions).subscribe(data => {
        this.clientForm.reset();
        this.lgModal.hide();
        this.getAllClients(true);
      },
        error => {
          this.postData = 'Name or NIPC already exists!';
        });
    }




  }
//delay for async
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

//Remove row
@ViewChild("search") search: ElementRef;
  public async remove(row) {
    if (this.isManager == true) {
      this.id = row.id;
      this.http.delete(this.apiUrlUpdManagers + this.id).subscribe(data => {
        this.managerForm.reset();
        
      },
        error => {
        });
        await this.delay(300);
        this.getAllManagers(true);
        
    }
    else {
      this.id = row.id;
      this.http.delete(this.apiUrlUpdClient + this.id).subscribe(data => {
        this.clientForm.reset();
      },
        error => {
        });
        await this.delay(300);
        this.getAllClients(true);
    }
    
  }

  //show Modal
  public add() {
    this.isEdit = false;
    this.isCreate = true;
    this.isManager = false;
    this.lgModal.show();

  }

//show Modal edit
  public edit(row: any) {
    this.isEdit = true;
    this.isCreate = false;
    this.lgModal.show();
    if (this.isManager == true) {
      this.currentType = 'Manager'
      this.managerForm.patchValue({
        id: row.id,
        email: row.email,
        name: row.name,
        nipc: row.nipc,
        unit: row.unit
      });
    }
    else {
      this.currentType = 'Client'
      this.clientForm.patchValue({
        id: row.id,
        name: row.name,
        nipc: row.nipc,
      });
    }

  }


  //Filter Search


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data

    if(val == "" && this.isManager== true){
      this.getAllManagers(true);
    }
    else if(val == "" && this.isManager== false){
      this.getAllClients(true);
    }
    else if(this.isManager == true){
      const temp = this.temp.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1;
      });
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else{
      const temp = this.temp.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || d.nipc.toString().indexOf(val) !== -1;
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    }
    
  
}
