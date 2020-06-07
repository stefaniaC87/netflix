import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Actor } from '../models/actor';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { CONFIG } from '../config';
import { UserService } from './user.service';

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

  getActors(): Observable<Actor[]> {
    if (this.actors) {
      return of(this.actors);
    } else {
      return this.http.get<Actor[]>(CONFIG.hostApi + '/actor/read.php').pipe(
        tap(response => this.actors = response),
      );
    }
  }

  addActor(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })

    };
    this.http.post<Actor>(CONFIG.hostApi + '/actor/create.php', this.newActor, httpOptions).subscribe(response => {

      this.http.get<Actor[]>(CONFIG.hostApi + '/actor/read.php', ).subscribe(response => this.actors = response);

    });


    // Reset newActor
    this.newActor = {
      firstname: '',
      lastname: ''
    };
  }

  editActor(): void {
    this.localStorage.store('actors', this.actors);
    this.selectedActor = null;
  }

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }
}
