import { Component, OnInit, SystemJsNgModuleLoader, ViewChild, HostListener } from "@angular/core";
import { Observable, observable } from "rxjs";
import * as moment from "moment";
import { InteractionsService } from "src/app/core/services/interactions.service";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';



@Component({
  selector: "app-layout-form",
  templateUrl: "./layout-form.component.html",
  styleUrls: ["./layout-form.component.scss"]
})
export class LayoutFormComponent implements OnInit {

  @ViewChild('formularioInteraction') private form;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('fireSwal') private fireSwal: SwalComponent;
  placeHolderText = "Select date";
  dateChoose = "";
  cliente = "";
  hasError = false;
  hasError2 = false;
  hasError3 = false;
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
  public managersByUnit$: Observable<any[]>;
  public interactionTypes$: Observable<Object>;
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
  static getCurrentDate: any;
  router: Route;

  constructor(private interactionService: InteractionsService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();
  }

  onChange(event) {

    if(this.selectUnit != null){

      let teste = document.getElementById("inlineFormCustomSelectPref2");
    teste.className =
      "custom-select my-1 mr-sm-2 ng-untouched ng-pristine ng-valid";

    if (event) {
      this.btnDisable = false;
    }
    this.idUnit = parseInt(this.selectUnit);
    console.log(this.selectUnit);
    this.managersbyUnit$ = this.interactionService.getManagerByUnit(
      this.selectUnit
    );
    this.managersbyUnit$.subscribe((managerByUnit: any[]) => {
      console.log("interactionType", managerByUnit);
    });

    }
   
  }

  ngOnInit(): void {
    this.getFormData();
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {

    if(window.innerWidth < 800){

      let formVisible = document.getElementById('formVisible');
      formVisible.removeAttribute('class');
      formVisible.setAttribute('class', 'container');

    } else {

      let formVisible = document.getElementById('formVisible');
      formVisible.removeAttribute('class');
      formVisible.setAttribute('class', 'central-container');

    }

  }

  addInteraction(tcode: string) {
    // tcode here is selectedDate.value no modal do html

    this.getCurrentDate(tcode);

    if (this.selectClient == "" || this.selectClient == null || this.selectClient == undefined) {
      let clientSelect = document.getElementById("selectionClient");
      clientSelect.className =
        "custom-select my-1 mr-sm-2 animated bounce error ng-valid ng-dirty ng-touched";
    } else if (this.selectType == "" ||this.selectType == null ||this.selectType == undefined) {
      let choosenInteraction = document.getElementById("selectionType");
      choosenInteraction.className =
        "custom-select my-1 mr-sm-2 animated bounce error ng-untouched ng-pristine ng-valid";
    } else {

      this.interactionTemp = {
        nameClient: this.selectClient.split("+")[1],
        idClient: this.selectClient.split("+")[0],
        interaction: this.selectType.split("+")[1],
        idInteraction: this.selectType.split("+")[0],
        nameUnit: this.isAuthorized ? this.selectUnit.split("+")[1] : "TESTEMANAGER",
        idUnit: this.isAuthorized ? this.selectUnit.split("+")[0] : "1",
        nameMan: this.isAuthorized ? this.selectPerson.split("+")[1] : this.currentRole[0].username,
        idMan: this.isAuthorized ? this.selectPerson.split("+")[0] : "5",
        week: this.numWeek
      };

      console.log(this.selectClient);
      console.log(this.interactionTemp.idClient);

      this.interactionTypeRow.push(this.interactionTemp);
      console.log(this.interactionTypeRow);

      if (this.interactionTypeRow.length != 0) {
        this.btnDisable = true;
        this.btnDisableUnit = true;
      }

      let modalBox = document.querySelector(".modal-backdrop");
      let modalBox2 = document.getElementById("exampleModal")
      modalBox.parentNode.removeChild(modalBox);
      modalBox2.style.display = "none";
      modalBox2.className = "modal fade";
      document.body.className="";

     /* let modalBox = document.getElementById("exampleModal");
      
      console.log(modalBox.tabIndex);
      console.log(modalBox.style.display);
      console.log(modalBox.className);

      modalBox.style.display = "none";
      modalBox.className = "modal fade";*/

    }
  }

  delRow(i: number) {
    this.interactionTypeRow.splice(i, 1);

    if (this.interactionTypeRow.length == 0) {
      this.btnDisable = true;
      this.btnDisableUnit = false;
    }
  }

  public accessVerification() {
    let authorized = false;
    this.userRole$ = this.interactionService.getUserRole();
    console.log(this.userRole$);

    this.userRole$.subscribe((user: any[]) => {
      console.log("userString", user);

      if (user[0].role == "director") {
        this.isAuthorized = true;
      }
      this.currentRole = user;
    });

    if (this.userRole$) {
      authorized = true;
    }
    return authorized;
  }

  public getValues() {
    console.log(this.cliente);
    console.log(this.maxDate);
  }

  sendData(tcode: string) {

    //console.log("Data escolhida " + tcode);
    let newDate = tcode.split(" ");
    let dataInicio = newDate[0];
    let dataFinal = newDate[2];
    //console.log("Data de inicio: " + dataInicio);
    //console.log("Data final: " + dataFinal);
    let data = moment(dataInicio, "MM-DD-YYYY");
    //console.log(data);
    this.numWeek = data.week();
    let choosenWeek = this.numWeek;
    let chooseUnit = this.selectUnit;
    let chooseManager = this.selectPerson;

    console.log(chooseManager);
    console.log(typeof chooseManager);

    if (isNaN(choosenWeek)) {

      this.placeHolderText = "You must select a date";
      this.hasError = true;

    } else if (chooseUnit == undefined) {

      let pickupUnit = document.getElementById("inlineFormCustomSelectPref2");//Store element in variable and change class trough className
      pickupUnit.className = "custom-select my-1 mr-sm-2 animated bounce error ng-untouched ng-pristine ng-valid";
      this.hasError2 = true;

    } else if (chooseManager == undefined) {

      let pickupManager = document.getElementById("inlineFormCustomSelectPref");
      pickupManager.className = "custom-select my-1 mr-sm-2 animated bounce error";
      this.hasError3 = true;
      
    } else if (this.interactionTypeRow.length == 0) {
      
      this.btnDisable = true;
      this.btnDisableUnit = false;
      this.errorSwal.fire();
    
    } else {

      this.postInteractions(this.interactionTypeRow);
      this.form.nativeElement.reset();
      this.interactionTypeRow = [];
      this.fireSwal.fire();


    }

  }

  public getFormData() {
    this.interactionTypes$ = this.interactionService.getInteractionType();
    this.clients$ = this.interactionService.getClients();
    this.units$ = this.interactionService.getUnits();

    this.interactionTypes$.subscribe((interactionType: any[]) => {
      console.log("interactionType", interactionType);
      this.interactionTypesArray = interactionType;
    });
    this.clients$.subscribe((client: any[]) => {
      console.log("interactionType", client);
      this.clientsArray = client;
    });
    this.units$.subscribe((unit: any[]) => {
      console.log("interactionType", unit);
      this.unitsArray = unit;
    });
  }

  postInteractions(interactionTypeRow) {

    for (let interaction of interactionTypeRow) {
      console.log("TEST POST INTERACTION", interaction);

      let interactionPOST = {
        dateInteraction: interaction.week,
        client: { id: interaction.idClient },
        interactionType: { id: interaction.idInteraction },
        person: { id: interaction.idMan },
        unit: { id: interaction.idUnit }
      };

      this.interactionService
        .createInteraction(interactionPOST)
        .subscribe(res => {
          console.log(res);
        });
    }

  }

  getCurrentDate(tcode: string) {
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

  validateError(value: String) {    
    this.hasError = false;
  }

  removeBorder() {
    let pickupManager = document.getElementById("inlineFormCustomSelectPref");
    pickupManager.className = "custom-select my-1 mr-sm-2";
  }

  removeBorderCliente() {
    let clientSelect = document.getElementById("selectionClient");
    clientSelect.className =
      "custom-select my-1 mr-sm-2 ng-valid ng-dirty ng-touched";
  }

  removeBorderInteraction() {
    let choosenInteraction = document.getElementById("selectionType");
    choosenInteraction.className =
      "custom-select my-1 mr-sm-2 ng-untouched ng-pristine ng-valid";
  }

  checkFields(tcode : string){
    
    //console.log("Data escolhida " + tcode);
    let newDate = tcode.split(" ");
    let dataInicio = newDate[0];
    let dataFinal = newDate[2];
    //console.log("Data de inicio: " + dataInicio);
    //console.log("Data final: " + dataFinal);
    let data = moment(dataInicio, "MM-DD-YYYY");
    //console.log(data);
    this.numWeek = data.week();
    let choosenWeek = this.numWeek;
    let chooseUnit = this.selectUnit;
    let chooseManager = this.selectPerson;

    if (isNaN(choosenWeek)) {

      console.log("VALOR DA SEMANA: " + choosenWeek);
      this.placeHolderText = "You must select a date";
      this.hasError = true;

    } else if (chooseUnit == undefined) {

      let pickupUnit = document.getElementById("inlineFormCustomSelectPref2");//Store element in variable and change class trough className
      pickupUnit.className = "custom-select my-1 mr-sm-2 animated bounce error ng-untouched ng-pristine ng-valid";
      this.hasError2 = true;

    } else if (chooseManager == undefined) {

      let pickupManager = document.getElementById("inlineFormCustomSelectPref");
      pickupManager.className = "custom-select my-1 mr-sm-2 animated bounce error";
      this.hasError3 = true;

  } else {

      let modalCheck = document.getElementById('modalButton');

    if(modalCheck.hasAttribute('data-toggle')){
      
      modalCheck.removeAttribute('data-toggle');
      modalCheck.setAttribute('data-toggle', 'modal');

    } else {

      modalCheck.setAttribute('data-toggle', 'modal');

    }   

  }

}

}
