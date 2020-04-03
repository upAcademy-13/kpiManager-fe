import { Observable, forkJoin } from 'rxjs';
import { Unidade } from './../../layout/dashboard/micael/grafico1';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http: HttpClient) { }


public getAllUnits() {
  return this.http
    .get('http://127.0.0.1:8080/kpiManager/api/interactions/allUnits').pipe(
      switchMap((units: any[]) => forkJoin(
      units.map(unit => this.countAllInteractionsPerUnit(unit)
        .pipe(
          map(interaction => {
            return {unit, interaction };
          })
          ))
        ))
      );
    }

public countAllInteractionsPerUnit(unit: String) {
  return this.http.get(
    "http://127.0.0.1:8080/kpiManager/api/interactions/count/interactions?unit=" +
      unit
  );
}}
