import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrlCount = 'http://localhost:8080/kpiManager/api/clients/count' ;

  constructor(
    private http: HttpClient
  ) { }


  public getCount(clients: Client[], params: HttpParams){

    return this.http.get<Client[]>(this.apiUrlCount, {params});
  }
  
  
}


