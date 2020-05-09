import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Actor } from '../models/actor';
const ACTORS: Actor[] = [
  {
    firstname: 'Kristen',
    lastname: 'Stewart'
  },
  {
    firstname: 'Robert',
    lastname: 'Pattinson'
  },
  {
    firstname: 'Peter',
    lastname: 'Facinelli'
  },
  {
    firstname: 'Taylor',
    lastname: 'Lautner'
  },
  {
    firstname: 'Billy',
    lastname: 'Burke'
  },
  {
    firstname: 'Tom',
    lastname: 'Hanks'
  },
  {
    firstname: 'Audrey',
    lastname: 'Tautou'
  },
  {
    firstname: 'Paul',
    lastname: 'Bettany'
  },
  {
    firstname: 'Jean-Pierre',
    lastname: 'Marielle'
  },
  {
    firstname: 'Felicity',
    lastname: 'Jones'
  },
  {
    firstname: 'Ben',
    lastname: 'Foster'
  },
  {
    firstname: 'Elija',
    lastname: 'Wood'
  },
  {
    firstname: 'Ian',
    lastname: 'McKellen'
  },
  {
    firstname: 'Liv',
    lastname: 'Tyler'
  },
  {
    firstname: 'Olando',
    lastname: 'Bloom'
  },
  {
    firstname: 'Andy',
    lastname: 'Serkis'
  },
  {
    firstname: 'Johnny',
    lastname: 'Depp'
  },
  {
    firstname: 'Orlando',
    lastname: 'Bloom'
  },
  {
    firstname: 'Keira',
    lastname: 'Knightley'
  },
  {
    firstname: 'Penelope',
    lastname: 'Cruz'
  },
  {
    firstname: 'K.J.',
    lastname: 'Apa'
  },
  {
    firstname: 'Lili',
    lastname: 'Reinhart'
  },
  {
    firstname: 'Camila',
    lastname: 'Mendes'
  },
  {
    firstname: 'Cole',
    lastname: 'Sprouse'
  },
  {
    firstname: 'Madelaine',
    lastname: 'Petsch'
  },
  {
    firstname: 'Marisol',
    lastname: 'Nichols'
  },
  {
    firstname: 'Luke',
    lastname: 'Perry'
  },
  {
    firstname: 'Skeet',
    lastname: 'Ulrich'
  },
  {
    firstname: 'Danielle Rose',
    lastname: 'Russell'
  },
  {
    firstname: 'Aria',
    lastname: 'Shahghasemi'
  },
  {
    firstname: 'Kaylee',
    lastname: 'Bryant'
  },
  {
    firstname: 'Jenny',
    lastname: 'Boyd'
  },
  {
    firstname: 'Matt',
    lastname: 'Davis'
  },
  {
    firstname: 'Tracy',
    lastname: 'Spiridakos'
  },
  {
    firstname: 'Giancarlo',
    lastname: 'Esposito'
  },
  {
    firstname: 'Cak',
    lastname: 'Orth'
  },
  {
    firstname: 'Elizabeth',
    lastname: 'Mitchell'
  },
  {
    firstname: 'J.D.',
    lastname: 'Pardo'
  },
  {
    firstname: 'David',
    lastname: 'Lyonss'
  },
  {
    firstname: 'Melissa',
    lastname: 'Benoist'
  },
  {
    firstname: 'Mehcad',
    lastname: 'Brooks'
  },
  {
    firstname: 'Chyler',
    lastname: 'Leigh'
  },
  {
    firstname: 'Jeremy',
    lastname: 'Jordan'
  },
  {
    firstname: 'David',
    lastname: 'Harewood'
  },
  {
    firstname: 'Chris',
    lastname: 'Wood'
  },
  {
    firstname: 'Katie',
    lastname: 'McGrath'
  },
  {
    firstname: 'Jesse',
    lastname: 'Rath'
  },
];
@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actors: Actor[];
  selectedActor: Actor;
  newActor: Actor = {
    firstname: '',
    lastname: ''
  };

  getActors(): Actor[] {
    this.actors = this.localStorage.retrieve('actors') || ACTORS;
    return this.actors;
  }
  addActor(): void {
    this.actors.push(this.newActor);
    this.localStorage.store('actors', this.actors);
    this.newActor = {
      firstname: '',
    lastname: ''
    };
  }
editActor(): void {
  this.localStorage.store('actors', this.actors);
  this.selectedActor = null;
}

  constructor(private localStorage: LocalStorageService) { }
}
