import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
const USERS:  User[] = [
  {
    id: 1,
    username: 'stefy',
    password: '5t3fan1a',
    firstname: 'Stefania',
    lastname: 'Cappellino',
    favoritesFilm: []
  },
  {
    id: 2,
    username: 'anto',
    password: 'anto22',
    firstname: 'Antonella',
    lastname: 'Cappellino',
    favoritesFilm: []
  },
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User;

  constructor(private localStorage: LocalStorageService) { }

  login(username: string, password: string): boolean {
    this.loggedUser = USERS.find(x=> x.username == username && x.password == password);

    this.localStorage.store('loggedUser', this.loggedUser);
    return this.loggedUser != null;
  }
  logout(): void {
    this.loggedUser = null;
    this.localStorage.clear('loggedUser');
  }
  getLoggedUser(): void {
    this.loggedUser = this.localStorage.retrieve('loggedUser');
  }
}
