import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(public http: HttpClient) {}

  ////////////////////
  // Funções Micael //
  ////////////////////
  public getAllUnitNames() {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allUnits"
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
      "http://127.0.0.1:8080/kpiManager/api/interactions/allUnitsFilter/" + unit
    );
  }

  ////////////////////
  // Funções Filipe //
  ////////////////////
  public getAllInteractionTypes() {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allInteractions"
    );
  }

  public countAllInteractionsPerInteractionType(interactionType: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/count/interactions?interactionType" +
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

  public getAllManagers() {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allBManagers"
    ).pipe(
      switchMap((managers: any[]) => forkJoin(
        managers.map(manager => this.countAllCvsPerWeekPerManager(manager, "2020")
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

  // function example() {
  //   return source.pipe(
  //      mergeMap(elements => forkJoin(
  //        elements.map(element => getLocations(element.id).pipe(
  //          map(cvs => {
  //            return {value: cvs, name: element.name};
  //          })
  //        ))
  //      ))
  //    )
  //  }


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
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allClients"
    );
  }

  public countAllInteractionsPerClient(clientName: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/count/interactions?clientName" +
        clientName
    );
  }

  //Apenas usar para preencher filtros da tabela, não necessário para gráficos
  public getAllInteractionsPerClient(clientName: String) {
    return this.http.get(
      "http://127.0.0.1:8080/kpiManager/api/interactions/allClientsFilter/" +
        clientName
    );
  }
}
