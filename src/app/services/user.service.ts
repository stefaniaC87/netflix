import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User;

  constructor(private localStorage: LocalStorageService) { }

  login(): void {
    this.loggedUser = {
      id: 1,
      firstname: 'Stefania',
      lastname: 'cappellino',
      favoritesFilm: []
    };

    this.localStorage.store('loggedUser', this.loggedUser);
  }
  logout(): void {
    this.loggedUser = null;
    this.localStorage.clear('loggedUser');
  }
  getLoggedUser(): void {
    this.loggedUser = this.localStorage.retrieve('loggedUser');
  }
}
