import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/models/user';

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


  public units$: Observable<any[]>
  public managers$: Observable<any[]>
  public managersByUnit$: Observable<any[]>
  public interactionTypes$: Observable<Object>
  public userRole$: Observable<Object>;
  public currentRole = [];
  public currentUser$: Observable<any[]>;

  private apiUrl: String = 'https://upacademytinder.herokuapp.com/api/users/';
  private apiUrlKpi: String = 'http://127.0.0.1:8080/kpiManager/api/';
  // private http: HttpClient   ------ Why doesn't work here? It has something to do with context of the function or something?

  constructor(private http: HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();
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
    this.userRole$ = this.http.get(this.apiUrl + '?filter={"where":{"username":"ze carlos"}}');

    this.userRole$.subscribe((user: any[]) => {
      console.log('userString', user);

      if (user[0].role == "director") {
        this.isAuthorized = true;
      }
      this.currentRole = user;
    })

    if (this.userRole$) {
      authorized = true;
    }

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
  }


  public getFormData() {

    this.interactionTypes$ = this.http.get(this.apiUrlKpi + 'interactiontype');
   // this.units$ = this.http.get(this.apiUrlKpi + 'units');
  // this.managersbyUnit$ = this.http.get(this.apiUrlKpi + 'managers');

    // this.managersbyUnit$ = this.http.get(this.apiUrlKpi + '127.0.0.1:8080/kpiManager/api/users/1/managers');

    this.interactionTypes$.subscribe((interactionType: any[]) => {
      console.log('interactionType', interactionType);
    })
  
  }

}




