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
  selectClient: string; //id do cliente
  selectType: string; //id do tipo de interacao
  interactionTemp: any;
  interactionTypeRow = [];
  isAuthorized: Boolean;
  date: any;
  selectUnit: string; // Select Unit
  teste: number;

  public currentUser: any;
  public managersByUnit$: Observable<any[]>
  public interactionTypes$: Observable<Object>
  public userRole$: Observable<Object>;
  public currentRole = [];
  public interactionTypesArray = [];
  public clientsArray = [];
  public unitsArray = [];
  public currentUser$: Observable<any[]>;
  public clients$: Observable<Object>;
  public units$: Observable<Object>;
  public managers$: Observable<Object>;
  public managersbyUnit$: Observable<Object>;
  public listlength$: Observable<Boolean>;
  public selectPerson: string;
  public numWeek: any;

  private apiUrl: String = 'https://upacademytinder.herokuapp.com/api/users/';
  private apiUrlKpi: String = 'http://127.0.0.1:8080/kpiManager/api/';
  // private http: HttpClient   ------ Why doesn't work here? It has something to do with context of the function or something?

  private companySelect: any;
  public btnDisable: boolean = true;
  public btnDisableUnit: boolean = false;

  constructor(private http: HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();

  }

  onChange(event) {
    if (event) {
      this.btnDisable = false;
    }
    this.teste = parseInt(this.selectUnit);
    console.log(this.selectUnit);
    this.managersbyUnit$ = this.http.get(this.apiUrlKpi + 'users/' + parseInt(this.selectUnit) + '/managers');
    this.managersbyUnit$.subscribe((managerByUnit: any[]) => {
      console.log('interactionType', managerByUnit);
    });
  }

  ngOnInit(): void {
    this.getFormData();

/*     this.listlength$.subscribe(btnDisable => {
      if  (this.interactionTypeRow.length != 0){
        btnDisable = true;
        console.log(btnDisable);
      }

    });   Tentativa de pôr um observável para enable/disable Business Manager  */

  }

  addInteraction(tcode: string) { // tcode here is selectedDate.value no modal do html

    this.getCurrentDate(tcode);
    
    if(this.isAuthorized){

    this.interactionTemp = {
      "nameClient": this.selectClient.split('+')[1],//vai ser o nome do cliente
      "idClient": this.selectClient.split('+')[0],
      "interaction": this.selectType.split('+')[1], //vai ser o tipo da interacao
      "idInteraction": this.selectType.split('+')[0],
      "nameUnit": this.selectUnit.split('+')[1],
      "idUnit": this.selectUnit.split('+')[0],
      "nameMan": this.selectPerson.split('+')[1],
      "idMan": this.selectPerson.split('+')[0],
      "week": this.numWeek
    }

    }else {
      this.interactionTemp = {
      "nameClient": this.selectClient.split('+')[1],//vai ser o nome do cliente
      "idClient": this.selectClient.split('+')[0],
      "interaction": this.selectType.split('+')[1], //vai ser o tipo da interacao
      "idInteraction": this.selectType.split('+')[0],
      "nameUnit": "TESTEMANAGER",
      "idUnit": "1",
      "nameMan": this.currentRole[0].username,
      "idMan": "5",
      "week": this.numWeek
    }

  }

    console.log(this.selectClient);
    console.log(this.interactionTemp.idClient);
    

    this.interactionTypeRow.push(this.interactionTemp);
    console.log(this.interactionTypeRow);

    if(this.interactionTypeRow.length != 0){
      this.btnDisable = true;
      this.btnDisableUnit = true;
    }

  }

  delRow(i: number) {
    this.interactionTypeRow.splice(i, 1);

    if(this.interactionTypeRow.length == 0){
      this.btnDisable = true;
      this.btnDisableUnit = false;
    }

  }
  // I think this should be in a data.service.ts file but for now stays here

  public accessVerification() {

    let authorized = false;
    this.userRole$ = this.http.get(this.apiUrl + '?filter={"where":{"username":"ze carlos"}}');
    console.log(this.userRole$);

    //  observable: userRole;

    this.userRole$.subscribe((user: any[]) => {
      console.log('userString', user);

      if (user[0].role == "director") {
        this.isAuthorized = false;
      }

      this.currentRole = user; //criar array com os valores armazenados 
    })

    if (this.userRole$) {
      authorized = true;
    }

    return authorized;
  }


  public getValues() {
    console.log(this.cliente);
    console.log(this.maxDate);
  }

  sendData() {
    
    if(this.interactionTypeRow.length == 0){
      this.btnDisable = true;
      this.btnDisableUnit = false;
    }

    this.postInteractions(this.interactionTypeRow);

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


  postInteractions(interactionTypeRow) {

    for (let interaction of interactionTypeRow) {

    console.log('TEST POST INTERACTION', interaction);

      let interactionPOST = 
      {
        "dateInteraction": interaction.week,
        "client": {"id": interaction.idClient},
        "interactionType": {"id": interaction.idInteraction},
        "person" : {"id": interaction.idMan},
        "unit" : {"id": interaction.idUnit}
      }


       this.http.post(this.apiUrlKpi +'interactions', interactionPOST)
        .toPromise()
        .then(inter => {console.log(inter) });
    }

  }

  getCurrentDate(tcode: string){

    console.log("Data escolhida " + tcode);
    let newDate = tcode.split(" ");
    let dataInicio = newDate[0];
    let dataFinal = newDate[2];
    console.log("Data de inicio: " + dataInicio);
    console.log("Data final: " + dataFinal);
    let data = moment(dataInicio, "MM-DD-YYYY");
    console.log(data);
    this.numWeek = data.week();
    console.log(this.numWeek);

  }

}




