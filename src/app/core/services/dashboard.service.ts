import { HttpClient } from "@angular/common/http";
import { Injectable, Input, Output } from "@angular/core";
import { forkJoin } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { Grafico3Component } from 'src/app/layout/dashboard/ana/grafico3/grafico3.component';

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(public http: HttpClient) {}  
  

  ////////////////////
  // Funções Micael //
  ////////////////////
  public getAllUnits() {
    return this.http
      .get("http://127.0.0.1:8080/kpiManager/api/interactions/allUnits")
      .pipe(
        switchMap((units: any[]) =>
          forkJoin(
            units.map(unit =>
              this.countAllInteractionsPerUnit(unit).pipe(
                map(interaction => {
                  return { unit, interaction };
                })
              )
            )
          )
        )
      );
  }

  public countAllInteractionsPerUnit(unit: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/count/interactions?unit=" +
        unit
    );
  }

  //Apenas usar para preencher filtros da tabela, não necessário para gráficos
  public getAllInteractionsPerUnit(unit: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allUnitiesFilter/" + unit
    );
  }

  ////////////////////
  // Funções Filipe //
  ////////////////////
  public getAllInteractionTypes() {
    return this.http
      .get("http://127.0.0.1:8080/kpiManager/api/interactions/allInteractions")
      .pipe(
        switchMap((interactionTypes: any[]) =>
          forkJoin(
            interactionTypes.map(interactions =>
              this.countAllInteractionsPerInteractionType(interactions).pipe(
                map(count => {
                  return { interactions, count };
                })
              )
            )
          )
        )
      );
  }

  public countAllInteractionsPerInteractionType(interactionType: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/count/interactions?interactionType=" +
        interactionType
    );
  }

  //Apenas usar para preencher filtros da tabela, não necessário para gráficos
  public getAllInteractionsPerInteractionType(interactionType: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allInteractionsFilter/" +
        interactionType
    );
  }

  /////////////////
  // Funções Ana //
  /////////////////

  public getAllWeeks(){
    return this.http.get("http://127.0.0.1:8080/kpiManager/api/interactions/allWeeks")
  }

  public getAllManagers(week: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allBManagers"
    ).pipe(
      switchMap((managers: any[]) => forkJoin(
        managers.map(manager => this.countAllCvsPerWeekPerManager(manager, week)
        .pipe(
          map(cvNumber => {
            return {manager, cvNumber}
          })
        ))
      ))
    )
    
  }

  public countAllCvsPerWeekPerManager(managerName: String, week: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/cvs/count/" +
        managerName +
        "?week=" +
        week
    );
  }


  //Apenas usar para preencher filtros da tabela, não necessário para gráficos
  public getAllCvsPerManagerPerWeek(managerName: String, week: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/cvs/" +
        managerName +
        "?week=" +
        week
    );
  }

  ///////////////////
  // Funções Vasco //
  ///////////////////

  public getAllClientNames() {
    return this.http
      .get("http://127.0.0.1:8080/kpiManager/api/interactions/allClients")
      .pipe(
        switchMap((clients: any[]) =>
          forkJoin(
            clients.map(client =>
              this.countAllInteractionsPerClient(client).pipe(
                map(interactions => {
                  return { client, interactions };
                })
              )
            )
          )
        )
      );
  }

  public countAllInteractionsPerClient(clientName: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/count/interactions?clientName=" +
        clientName
    );
  }
}
