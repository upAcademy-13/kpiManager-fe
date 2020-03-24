import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DataInteraction } from '../models/dataInteration';

@Injectable({
  providedIn: 'root'
})
export class DataService {
      constructor() { }
    private statistics: DataInteraction[] = [
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      },
      {
        id: 1,
        semana: 2,
        unidade: 'unidade A',
        businessManager: 'Daiana',
        cliente:"sibs",
        tipoDeInteracao: 'Entrevista',
        numerodeInteracoes: 3
      }
    ];

  public getAllData(){
    console.log(this.statistics);
    return of(this.statistics); // operador da bibli do angular do rxjs
  

  }


}
