import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/models/user';
import * as moment from 'moment';


@Component({
  selector: 'app-layout-form',
  templateUrl: './layout-form.component.html',
  styleUrls: ['./layout-form.component.scss']
})

export class LayoutFormComponent implements OnInit {

      dateChoose = "";
      cliente = "";
      
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  selectClient: number; //id do cliente
  selectType: number; //id do tipo de interacao
  interactionTemp: object;
  interactionTypeRow = [];
  isAuthorized: Boolean;
  date:any;
  selectUnit:number;
  teste:number;

  public userRole$: Observable<Object>;
  public currentRole = [];
  public interactionTypesArray = [];
  public clientsArray =[];
  public unitsArray =[];
  public currentUser$: Observable<any[]>;
  public interactionTypes$: Observable<Object>;
  public clients$: Observable<Object>;
  public units$: Observable<Object>;
  public managers$: Observable<Object>;
  public managersbyUnit$: Observable<Object>;

  private apiUrl: String = 'https://upacademytinder.herokuapp.com/api/users/';
  private apiUrlKpi: String = 'http://127.0.0.1:8080/kpiManager/api/';
  // private http: HttpClient   ------ Why doesn't work here? It has something to do with context of the function or something?

  private companySelect: any;
  public btnDisable: boolean = true;

  constructor(private http: HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();

  }

  onChange(event) {
    if(event) {
        this.btnDisable = false;
    }
    this.teste = this.selectUnit;
    console.log(this.selectUnit);
    this.managersbyUnit$ = this.http.get(this.apiUrlKpi + 'users/'+this.selectUnit+'/managers');
    this.managersbyUnit$.subscribe((managerByUnit: any[]) => {      
      console.log('interactionType', managerByUnit);     
    });
}

  ngOnInit(): void {
    this.getFormData();
  }

  addInteraction() {
    this.interactionTemp = {
      "name": this.selectClient, //vai ser o nome do cliente
      "interaction": this.selectType //vai ser o tipo da interacao
    }
    this.interactionTypeRow.push(this.interactionTemp);
    console.log(this.interactionTypeRow);
  }
  delRow(i: number) {
    this.interactionTypeRow.splice(i, 1);
  }
  // I think this should be in a data.service.ts file but for now stays here

  public accessVerification() {

    let authorized = false;
    //let userRole = "director"; // dummy director, this will be replaced with a query below;

    // let userRole = this.http.get(this.apiUrl + '?filter={"where":{"username":"ze carlos"}}');

    // For now we only need top check if this request id exists

    this.userRole$ = this.http.get(this.apiUrl + '?filter={"where":{"username":"ze carlos"}}');
    console.log(this.userRole$);

    //  observable: userRole;

    this.userRole$.subscribe((user: any[]) => {
      console.log('userString', user);

      if (user[0].role == "director") {
        this.isAuthorized = true;
      }

      this.currentRole = user; //criar array com os valores armazenados 
    })


    console.log(this.currentRole);

    if (this.userRole$) {
      authorized = true;
      console.log(authorized);
    }

    console.log('tou no access Verification');
    //   console.log(authorized);
    return authorized;

  }


public getValues(){
  console.log(this.cliente);
  console.log(this.maxDate);
  }

  testarPrintDate(tcode: string){
    console.log("Data escolhida " + tcode);
    let newDate = tcode.split(" ");
    let dataInicio = newDate[0];
    let dataFinal = newDate[2];
    console.log("Data de inicio: " + dataInicio);
    console.log("Data final: " + dataFinal);
    let data = moment(dataInicio, "MM-DD-YYYY");
    console.log(data);
    let numWeek = data.week();
    console.log(numWeek);
  }

  public getFormData() {     
    this.interactionTypes$ = this.http.get(this.apiUrlKpi + 'interactiontype');
    this.clients$ = this.http.get(this.apiUrlKpi + 'clients');  
    this.units$ = this.http.get(this.apiUrlKpi + 'units'); 
        
    this.interactionTypes$.subscribe((interactionType: any[]) => {      
      console.log('interactionType', interactionType); 
      this.interactionTypesArray = interactionType;    
    });
    this.clients$.subscribe((client: any[]) => {      
      console.log('interactionType', client);
      this.clientsArray = client;     
    });  
    this.units$.subscribe((unit: any[]) => {      
      console.log('interactionType', unit);
      this.unitsArray = unit;     
    });
    
  }
}


