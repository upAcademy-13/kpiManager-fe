import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Observable, observable } from 'rxjs';
import * as moment from 'moment';
import { InteractionsService } from 'src/app/core/services/interactions.service';


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
  selectUnit: string; // Select Unit
  interactionTemp: any;
  interactionTypeRow = [];
  isAuthorized: Boolean;
  date: any;
  idUnit: number;

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

  
  public btnDisable: boolean = true;
  public btnDisableUnit: boolean = false;

  constructor(private interactionService:InteractionsService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();
  }

  onChange(event) {
    if (event) {
      this.btnDisable = false;
    }
    this.idUnit = parseInt(this.selectUnit);
    console.log(this.selectUnit);
    this.managersbyUnit$ = this.interactionService.getManagerByUnit(this.selectUnit);
    this.managersbyUnit$.subscribe((managerByUnit: any[]) => {
      console.log('interactionType', managerByUnit);
    });
  }

  ngOnInit(): void {
    this.getFormData();
  }

  addInteraction(tcode: string) { // tcode here is selectedDate.value no modal do html

    this.getCurrentDate(tcode);
    

    this.interactionTemp = {
      "nameClient": this.selectClient.split('+')[1],
      "idClient": this.selectClient.split('+')[0],
      "interaction": this.selectType.split('+')[1], 
      "idInteraction": this.selectType.split('+')[0],
      "nameUnit": this.isAuthorized ? this.selectUnit.split('+')[1] : "TESTEMANAGER",
      "idUnit": this.isAuthorized ? this.selectUnit.split('+')[0]: "1",
      "nameMan": this.isAuthorized ? this.selectPerson.split('+')[1]:this.currentRole[0].username,
      "idMan": this.isAuthorized ? this.selectPerson.split('+')[0]: "5",
      "week": this.numWeek
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

  public accessVerification() {

    let authorized = false;
    this.userRole$ = this.interactionService.getUserRole();
    console.log(this.userRole$);

    this.userRole$.subscribe((user: any[]) => {
      console.log('userString', user);

      if (user[0].role == "director") {
        this.isAuthorized = false;
      }
      this.currentRole = user; 
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
    this.interactionTypes$ = this.interactionService.getInteractionType();
    this.clients$ = this.interactionService.getClients();
    this.units$ = this.interactionService.getUnits();

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

      this.interactionService.createInteraction(interactionPOST).subscribe(res=>{
        console.log(res);
      });
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




