import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

@Component({
  selector: 'app-layout-form',
  templateUrl: './layout-form.component.html',
  styleUrls: ['./layout-form.component.scss']
})

export class LayoutFormComponent implements OnInit {

      bsInlineValue = new Date();
      bsInlineRangeValue: Date[];
      maxDate = new Date();
      selectClient: number; //id do cliente
      selectType: number; //id do tipo de interacao
      interactionTemp:object;
      interactionTypeRow=[];
      isAuthorized: Boolean;


  constructor() { 
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();

  }
  

  ngOnInit(): void {
  }


  addInteraction(){
    this.interactionTemp = {
      "name": this.selectClient, //vai ser o nome do cliente
      "interaction": this.selectType //vai ser o tipo da interacao
    }
    this.interactionTypeRow.push(this.interactionTemp);
    console.log(this.interactionTypeRow);
  }
  delRow(i:number){
    this.interactionTypeRow.splice(i, 1);
  }


  public accessVerification() {

    let authorized = false;
    //let userRole = "director"; // dummy director, this will be replaced with a query below;

   // let userRole = this.http.get(this.apiUrl + '?filter={"where":{"username":"ze carlos"}}');

    // If it is a document request -> this.http.get('url');
    // url -> endpoint where the currentUser is stored
    // Access role atribute in currentUser object -> .role ?

    console.log('userRole');

    // yes but it is going to have 

   // if (userRole) { //   if (userRole == "director") By now it's only 2 clearance levels, Director and other (manager)
      authorized = true;
      console.log(authorized);
   // }

    console.log('tou no access Verification');
 //   console.log(authorized);

    return authorized;

  }


}




   

