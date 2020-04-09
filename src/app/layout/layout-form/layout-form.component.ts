import { Component, OnInit, SystemJsNgModuleLoader, ViewChild, HostListener } from "@angular/core";
import { Observable, observable } from "rxjs";
import * as moment from "moment";
import { InteractionsService } from "src/app/core/services/interactions.service";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpParams } from '@angular/common/http';
import { id } from '@swimlane/ngx-datatable';
import { MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';



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
  public clients$: Observable<Object>;
  public units$: Observable<Object>;
  public managers$: Observable<Object>;
  public managersbyUnit$: Observable<Object>;
  public listlength$: Observable<Boolean>;
  public selectPerson: string;
  public numWeek: any;
  public tokenInfo: any;
  public currentUserInteractions: object[];
  public currentInteractions: object[];
  public userInteractions$: Observable<Object>
  public btnDisableAddInt: Boolean = false;
  public btnDisableEditInt: Boolean = false;
  public interactionTableLength$: Observable<number>;
  public currentInteraction: any;


  public btnDisable: boolean = true;
  public btnDisableUnit: boolean = false;
  static getCurrentDate: any;
  router: Route;

  constructor(private interactionService: InteractionsService, private authService: AuthService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    //this.isAuthorized = this.accessVerification();
  }

  ngOnInit(): void {

    this.getFormData();
    this.tokenInfo = this.authService.getDecodedAccessToken(localStorage.getItem("token"));
    this.interactionService.getUserById(this.tokenInfo.id).subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)

    });

  }

  /* A linha do this.interactionService.getUserById faz o mesmo que esta função toda
  
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
    } */


  onChange(event) {

    this.selectPerson = undefined;

    if (this.selectUnit != null) {

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

  // To adjust responsive window

  @HostListener('window:resize', ['$event'])

  onResize(event) {

    if (window.innerWidth < 800) {

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
    } else if (this.selectType == "" || this.selectType == null || this.selectType == undefined) {
      let choosenInteraction = document.getElementById("selectionType");
      choosenInteraction.className =
        "custom-select my-1 mr-sm-2 animated bounce error ng-untouched ng-pristine ng-valid";
    } else {

      this.interactionTemp = {

        client: {
          name: this.selectClient.split("+")[1],
          id: this.selectClient.split("+")[0]
        },
        person: {
          name: this.tokenInfo.role != "manager" ? this.selectPerson.split("+")[1] : this.tokenInfo.iss,
          id: this.tokenInfo.role != "manager" ? this.selectPerson.split("+")[0] : this.currentUser.id
        },
        unit: {
          nameUnit: this.tokenInfo.role != "manager" ? this.selectUnit.split("+")[1] : this.currentUser.unit.nameUnit,
          id: this.tokenInfo.role != "manager" ? this.selectUnit.split("+")[0] : this.currentUser.unit.id
        },

        interactionType: {
          interactionType: this.selectType.split("+")[1],
          id: this.selectType.split("+")[0]
        },

        week: this.numWeek
      }

      /*       console.log(this.selectClient);
            console.log(this.interactionTemp.idClient);
       */
      this.interactionTypeRow.push(this.interactionTemp);
      //      console.log(this.interactionTypeRow);


      if (this.interactionTypeRow.length != 0) {
        this.btnDisable = true;
        this.btnDisableUnit = true;
      }


      this.addInteractionButtonMode()
      this.updateTableHeader();
      this.btnDisableEditInt = true;

      let modalBox = document.querySelector(".modal-backdrop");
      let modalBox2 = document.getElementById("exampleModal");
      modalBox.parentNode.removeChild(modalBox);
      modalBox2.style.display = "none";
      modalBox2.className = "modal fade";
      document.body.className = "";

    }

  }

  delRow(i: number) {
    this.interactionTypeRow.splice(i, 1);

    if (this.interactionTypeRow.length == 0) {
      this.btnDisable = true;
      this.btnDisableUnit = false;
      this.btnDisableEditInt = false;
      this.form.nativeElement.reset();
      this.numWeek = null;
      this.interactionTypeRow = [];
    }

    this.updateTableHeader();

  }

 // De modo que se tenha acesso à this.currentInteraction.id dentro do modal quando se faz "Save Changes"
  triggerModelDeleteDB(i){

    this.currentInteraction = this.interactionTypeRow[i];
    console.log("INTERACAO CORRENTE" + this.currentInteraction)
  }


  deleteFromDB(){
    // Vai chamar o serviço de delete com o id removeId
    this.interactionService.deleteInteraction(this.currentInteraction)
    .subscribe(()=>this.getInteractionsByFilters()); // Senão tiver aqui no subcribe, ele faz um "fetch" antes de apagar e o delete fica sem efeito
  }

  public getValues() {
    console.log(this.cliente);
    console.log(this.maxDate);
  }

  sendData(tcode: string) {

    //REFACTOR THIS FUNCTION (CheckFields Function);

    let newDate = tcode.split(" ");
    let dataInicio = newDate[0];
    let dataFinal = newDate[2];
    let data = moment(dataInicio, "MM-DD-YYYY");
    this.numWeek = data.week();
    let choosenWeek = this.numWeek;
    let chooseUnit = this.selectUnit;
    let chooseManager = this.selectPerson;

    if (isNaN(choosenWeek)) {

      this.placeHolderText = "You must select a date";
      this.hasError = true;
      this.errorSwal.fire();

    } else if (chooseUnit == undefined && this.currentUser.role != "manager") {

      let pickupUnit = document.getElementById("inlineFormCustomSelectPref2");//Store element in variable and change class trough className
      pickupUnit.className = "custom-select my-1 mr-sm-2 animated bounce error ng-untouched ng-pristine ng-valid";
      this.hasError2 = true;
      this.errorSwal.fire();

    } else if (chooseManager == undefined && this.currentUser.role != "manager") {

      let pickupManager = document.getElementById("inlineFormCustomSelectPref");
      pickupManager.className = "custom-select my-1 mr-sm-2 animated bounce error";
      this.hasError3 = true;
      this.errorSwal.fire();

    } else if (this.interactionTypeRow.length == 0) {

      this.btnDisable = true; // btnDisable -> Manager
      this.btnDisableUnit = false;
      this.errorSwal.fire();

    } else {

      this.postInteractions(this.interactionTypeRow);
      this.form.nativeElement.reset();
      this.interactionTypeRow = [];
      this.fireSwal.fire();
      this.btnDisableUnit = false;
      this.btnDisableEditInt = false;
      this.numWeek = null;
      this.updateTableHeader();
    }
  }

  postInteractions(interactionTypeRow) {

    for (let interaction of interactionTypeRow) {
      console.log("TEST POST INTERACTION", interaction);

      let interactionPOST = { // De acordo com a estrutura do interactionTemp que vai popular o interactionTypeRow
        dateInteraction: interaction.week,
        client: { id: interaction.client.id },
        interactionType: { id: interaction.interactionType.id },
        person: { id: interaction.person.id },
        unit: { id: interaction.unit.id }
      };

      this.interactionService
        .createInteraction(interactionPOST)
        .subscribe(res => {
          console.log(res);
        });
    }

    this.btnDisableAddInt = false;

    this.updateTableHeader();

  }

  putInteraction() {


    console.log(this.currentInteraction);

    let interactionPUT = { // De acordo com a estrutura do interactionTemp que vai popular o interactionTypeRow
      id: this.currentInteraction.id,
      dateInteraction: this.currentInteraction.dateInteraction,
      client: { id: this.selectClient.split("+")[0] },
      interactionType: { id: this.selectType.split("+")[0] },
      person: { id: this.currentInteraction.person.id },
      unit: { id: this.currentInteraction.unit.id }
    };

    this.interactionService
      .updateInteraction(interactionPUT)
      .subscribe(res => {
        console.log(res);
        this.getInteractionsByFilters()
      });


    this.btnDisableAddInt = false;

    this.updateTableHeader();

    //Para dar um "refresh" à tabela por filtros e tudo

  }

  // REFACTOR THIS FUNCTION; IT IS REPEATED BEFORE IN addInteraction FUNCTION
  triggerEditModal(i) {

    this.currentInteraction = this.interactionTypeRow[i];

    console.log(this.currentInteraction);

    console.log(this.interactionTypeRow);


    this.selectClient = this.currentInteraction.client.id + "+" + this.currentInteraction.client.name;
    this.selectType = this.currentInteraction.interactionType.id + "+" + this.currentInteraction.interactionType.interactionType;

    this.currentInteraction = { //Copia-se o objecto todo e dá-se override só as que se querem
      ...this.currentInteraction,
      client: {
        name: this.selectClient.split("+")[1],
        id: this.selectClient.split("+")[0]
      },
      interactionType: {
        interactionType: this.selectType.split("+")[1],
        id: this.selectType.split("+")[0]
      }
    }

    console.log(this.currentInteraction);

    /*  this.currentInteraction = {
         id: this.currentInteraction.id,
         client: {
           name: this.selectClient.split("+")[1],
           id: this.selectClient.split("+")[0]
         },
          person: {
           name: this.tokenInfo.role != "manager" ? this.selectPerson.split("+")[1] : this.tokenInfo.iss,
           id: this.tokenInfo.role != "manager" ? this.selectPerson.split("+")[0] : this.currentUser.id
         },
         unit: {
           nameUnit: this.tokenInfo.role != "manager" ? this.selectUnit.split("+")[1] : this.currentUser.unit.nameUnit,
           id: this.tokenInfo.role != "manager" ? this.selectUnit.split("+")[0] : this.currentUser.unit.id
         },
   
         interactionType: {
           interactionType: this.selectType.split("+")[1],
           id: this.selectType.split("+")[0]
         },
   
         week: this.numWeek
   
       }  */

    console.log('EDIT OK OK OK OK OK OK OK');
    console.log('DEPOIS EDIT' + this.currentInteraction);
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



  checkFields(tcode: string) {

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

    } else if (chooseUnit == undefined && this.currentUser.role != "manager") {

      let pickupUnit = document.getElementById("inlineFormCustomSelectPref2");//Store element in variable and change class trough className
      pickupUnit.className = "custom-select my-1 mr-sm-2 animated bounce error ng-untouched ng-pristine ng-valid";
      this.hasError2 = true;

    } else if (chooseManager == undefined && this.currentUser.role != "manager") {

      let pickupManager = document.getElementById("inlineFormCustomSelectPref");
      pickupManager.className = "custom-select my-1 mr-sm-2 animated bounce error";
      this.hasError3 = true;

    } else {

      let modalCheck = document.getElementById('modalButton');

      if (modalCheck.hasAttribute('data-toggle')) {

        modalCheck.removeAttribute('data-toggle');
        modalCheck.setAttribute('data-toggle', 'modal');

      } else {

        modalCheck.setAttribute('data-toggle', 'modal');

      }
    }
  }

  getInteractionsByFilters() {

    this.interactionTypeRow = [];

    let params = new HttpParams();

    params = params.append('sel0', !!this.numWeek ? this.numWeek : null); // Para não ir nenhum filtro undefined e sim null
    
    if (this.currentUser.role != 'manager') {
      params = params.append('sel1', !!this.selectUnit ? this.selectUnit.split("+")[1] : null);
      params = params.append('sel3', !!this.selectPerson ? this.selectPerson.split("+")[1] : null); // Nao funca

      console.log('PARAMETROS SELECT' + params);
      
     // console.log('PERSON NAME///' + this.selectPerson.split("+")[1]);

    } else {
      params = params.append('sel1', this.currentUser.unit.nameUnit);
      params = params.append('sel3', this.currentUser.username);
    }

    params = params.append('sel2', null); // Pelos vistos precisam de ir a null
    params = params.append('sel4', null);

    console.log('params', params);

    this.interactionService.getAllInteractionsFilter(params).subscribe((inter: object[]) => {
      this.interactionTypeRow = [...inter];
      this.updateTableHeader()
      console.log(this.interactionTypeRow);
    });

    this.btnDisableAddInt = true;

    this.editInteractionButtonMode();

  }

  cancelButton() {

    this.btnDisableAddInt = false;
    this.form.nativeElement.reset();
    this.interactionTypeRow = [];
    this.btnDisableUnit = false;
    this.updateTableHeader();
    this.addInteractionButtonMode();
    this.numWeek = null;

  }

  updateTableHeader() {
    let table = document.getElementById("tableInteractions");
    if (this.interactionTypeRow.length == 0) {
      table.className = "table mt-3 d-none";
    } else {
      table.className = "table mt-3";
    }
  }

  editInteractionButtonMode() {

    let sendDiv = document.getElementById("sendDiv");
    sendDiv.className = "d-none";
    let cancelDiv = document.getElementById("cancelDiv");
    cancelDiv.className = "";
/*     document.getElementById("modalButton").disabled = true;
    document.getElementById("myInteractions").disabled = false; */
  }

  addInteractionButtonMode() {

    let sendDiv = document.getElementById("sendDiv");
    sendDiv.className = "";
    let cancelDiv = document.getElementById("cancelDiv");
    cancelDiv.className = "d-none";
/*     document.getElementById("myInteractions").disabled = true;
    document.getElementById("modalButton").disabled = false; */
  
  }



  /*   getMyInteractions() {
  
      this.currentUserInteractions = [];
  
      if (this.currentUser.role != "manager") {
        this.interactionService.getAllInteractions().subscribe((inter: object[]) => this.currentUserInteractions.push(...inter));
      } else {
        this.interactionService.getInteractionByUserId(this.currentUser.id).subscribe((inter: object) => {
          this.currentUserInteractions.push(inter);
        }
        );
  
      }
  
      this.currentInteractions = [...this.currentUserInteractions];
      console.log(this.currentUserInteractions);
      console.log(this.currentInteractions);
  
      // console.log(this.currentUserInteractions[0].length);
  
    } */


  /* A linha do this.interactionService.getUserById faz o mesmo que esta função toda
  
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
    } */

}
