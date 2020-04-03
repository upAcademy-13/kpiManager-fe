import { Observable } from 'rxjs';
import { Unidade } from './../../layout/dashboard/micael/grafico1';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http: HttpClient) { }

private caminho = 'assets/data/dados.json ';

getAllUnits(): Observable <Unidade[]> {
   return this.http.get<Unidade[]>(this.caminho);
  }
}
