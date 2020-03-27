import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DataInteraction } from '../models/dataInteration';
import { HttpHeaders, HttpClient } from '@angular/common/http';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:16434/api/clientes';
  constructor(private http: HttpClient) { }
  getAllCliente(): Observable<DataInteraction[]> {
    return this.http.get<DataInteraction[]>(this.url + '/todos');
  }

  private statistics: DataInteraction[] = [
    {
      id: 1,
      semana: 8,
      unidade: 'unidade B',
      businessManager: 'Flávio',
      cliente: "sibs",
      tipoDeInteracao: 'Conversa',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Joana',
      cliente: "sibs",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Carlos',
      cliente: "sibs",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Pedro',
      cliente: "sibs",
      tipoDeInteracao: 'CV',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Ana',
      cliente: "Santander",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade C',
      businessManager: 'Matheus',
      cliente: "sibs",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade D',
      businessManager: 'Lucas',
      cliente: "Nova base",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade E',
      businessManager: 'Marcos',
      cliente: "cellfocus",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'Porto',
      businessManager: 'Amanda',
      cliente: "Novo banco",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Barbara',
      cliente: "BNP",
      tipoDeInteracao: 'Entrevista',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Luana',
      cliente: "sibs",
      tipoDeInteracao: 'Conversa',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Laura',
      cliente: "santander",
      tipoDeInteracao: 'Visita',
      numerodeInteracoes: 3
    },
    {
      id: 1,
      semana: 2,
      unidade: 'unidade A',
      businessManager: 'Bruna',
      cliente: "BNP",
      tipoDeInteracao: 'CV',
      numerodeInteracoes: 3
    }
  ];


  // public getAllData() {
  //   console.log(this.statistics);
  //   return of(this.statistics); // operador da bibli do angular do rxjs
  // }
  // public getBooks():Observable<Book[]> {
  //   return this.http.get<Book[]>('http://127.0.0.1:3000/Books/api/book');
  // }

  public getAllData():Observable<DataInteraction[]> {
    return this.http.get<DataInteraction[]>('http://localhost:3000/statistics');
  }


}
