import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DataInteraction } from '../models/dataInteration';
import { HttpHeaders, HttpClient } from '@angular/common/http';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class DataService {
  obs: DataInteraction[] = [];



  constructor(private http: HttpClient) {

  }
 

  public getAllData(): Observable<DataInteraction[]> {
    return this.http.get<DataInteraction[]>('http://127.0.0.1:3000/kpiManager/api/interactions/all');
  }


}
