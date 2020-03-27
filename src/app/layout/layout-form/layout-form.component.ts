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

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  selectClient: number; //id do cliente
  selectType: number; //id do tipo de interacao
  interactionTemp: object;
  interactionTypeRow = [];
  isAuthorized: Boolean;

  public userRole$: Observable<Object>;
  public currentRole = [];
  public currentUser$: Observable<any[]>;

  private apiUrl: String = 'https://upacademytinder.herokuapp.com/api/users/';
  // private http: HttpClient   ------ Why doesn't work here? It has something to do with context of the function or something?

  constructor(private http: HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.isAuthorized = this.accessVerification();
  }


  ngOnInit(): void {
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

    console.log(this.userRole$);

    this.userRole$.subscribe((user: any[]) => {
      console.log('userString', user);

      if (user[0].role == "director") {
        this.isAuthorized = true;
      }

      this.currentRole = user;
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


}






