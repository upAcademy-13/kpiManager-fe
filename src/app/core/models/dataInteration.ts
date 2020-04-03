import { Unit } from './unit';
import { Person } from './person';
import { Client } from './client';
import { InteractionType } from './interactionType';

export class DataInteraction {
    id: number;
    dateInteraction: string;
    unit: Unit;
    client:Client;
    person: Person;
    interactionType: InteractionType;
    //numerodeInteracoes: number;
  }
