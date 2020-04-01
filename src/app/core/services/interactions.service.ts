import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(
    private http:HttpClient
  ) { }

  private apiUrl: String = 'https://upacademytinder.herokuapp.com/api/users/';
  private apiUrlKpi: String = 'http://127.0.0.1:8080/kpiManager/api/';

  createInteraction(interaction){
    return this.http.post(this.apiUrlKpi +'interactions', interaction);
  }
  getInteractionType(){
    return this.http.get(this.apiUrlKpi + 'interactiontype');
  }
  getClients(){
    return this.http.get(this.apiUrlKpi + 'clients');
  }
  getUnits(){
    return this.http.get(this.apiUrlKpi + 'units');
  }
  getUserRole(){
    return this.http.get(this.apiUrl + '?filter={"where":{"username":"ze carlos"}}');
  }
  getManagerByUnit(selectUnit){
    return this.http.get(this.apiUrlKpi + 'users/' + parseInt(selectUnit) + '/managers');
  }
}
