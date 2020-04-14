import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrlKpi: String = 'http://127.0.0.1:8080/kpiManager/api/';

  createInteraction(interaction) {
    return this.http.post(this.apiUrlKpi + 'interactions', interaction);
  }

  updateInteraction(interaction) {
    return this.http.put(this.apiUrlKpi + 'interactions/' + interaction.id, interaction);
  }
  updateClient(client) {
    return this.http.put(this.apiUrlKpi + 'clients/' + client.id, client);
  }
  deleteInteraction(interaction) {

    console.log("INTERACTION ID   " + interaction.id);
    return this.http.delete(this.apiUrlKpi + 'interactions/' + interaction.id);

  }

  getInteractionType() {
    return this.http.get(this.apiUrlKpi + 'interactiontype');
  }
  getClients() {
    return this.http.get(this.apiUrlKpi + 'clients');
  }
  getUnits() {
    return this.http.get(this.apiUrlKpi + 'units');
  }
  getUserById(id: number) {
    return this.http.get(this.apiUrlKpi + 'users/' + id);
  }
  getManagerByUnit(selectUnit) {
    return this.http.get(this.apiUrlKpi + 'users/' + parseInt(selectUnit) + '/managers');
  }
  getInteractionByUserId(idPerson: any) {
    return this.http.get(this.apiUrlKpi + 'interactions' + '/person/' + idPerson);
  }
  getAllInteractions() {
    return this.http.get(this.apiUrlKpi + 'interactions/all');
  }

  getAllInteractionsFilter(params) {
    return this.http.get<any[]>(this.apiUrlKpi + 'interactions/filtro', {
      params: params
    });

  }

}
