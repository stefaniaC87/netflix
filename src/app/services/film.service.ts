import { Injectable } from '@angular/core';
import { Film } from '../models/film';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { CONFIG } from '../config';



@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Film[];

  constructor(

    private http: HttpClient,
    private userService: UserService) { }


  getFilms(): Observable<Film[]> {
if(this.films){
  return of(this.films);
}
else{
  return this.http.get<Film[]>(CONFIG.hostApi + '/film/read.php').pipe(
    map(films => films.map(film =>{
      film.stars = (film as any).vote;
      film.coverUrl = (film as any).cover_url;
      film.createdBy = (film as any).created_by;
      return film;
    })),
    tap(response => {
      console.log('filma scaricati dal server:', response);
      this.films = response;
    }),
catchError(error => {
  alert(error.status + ':' + error.error);
  return [];
})
  );
}

  }

  addFilm(film: Film): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();
    if(!loggedUser){
      alert('please login');
      return;
    }
   let httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': loggedUser.token
     })
   };
   console.log('provo ad aggiungere il film', film);
   return this.http.post<any>(CONFIG.hostApi + '/film/create.pgp', film, httpOptions).pipe(
     tap(response => {
       if(response.success){
         if(this.films){
           film.id = response.id;
           this.films.push(film);
         }
         else{
           this.getFilms().subscribe();
         }
       }
     }),
     catchError(error => {
       alert(error.status + ':' + error.error);
       return of(false);
     })
   );

  }
editFilm(film: Film): Observable<any> {
  let loggedUser = this.userService.getLoggedUser();
if(!loggedUser){
  alert('please login');
  return;
}
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' ,
    'Authorization': loggedUser.token
  })
};

console.log('provo ad editare il film', film);
return this.http.post<any>(CONFIG.hostApi + '/film/update.php', film, httpOptions).pipe(
  tap(response => {
    console.log(response);
if(response.success){
  if(this.films){
    let filmToEdit = this.films.find(x => x.id == film.id);
    filmToEdit = film;
  }
  else{
    this.getFilms().subscribe();
  }
}
  }),
  catchError(error => {
    alert(error.status + ':' + error.error);
    return of(false);
  })
);

}
removeFilm(film: Film): Observable<any> {
  let loggedUser = this.userService.getLoggedUser();
 if(!loggedUser){
   alert('please login');
   return:
 }
 let httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json' ,
    'Authorization': loggedUser.token
  })
};
console.log('provo a cancellare il film', film);
return this.http.post<any>(CONFIG.hostApi + '/film/delete.php', {id: film.id}, httpOptions).pipe(
  tap(response => {
    if(response.success){
      if(this.films){
        this.films = this.films.filter(x => x.id != film.id);
      }
      else{
        this.getFilms().subscribe();
      }
    }
  }),
  catchError(error => {
    alert(error.status + ':' + error.error);
    return of (false);
  })
);

}

getLastFilms(films: Film[]): Film[] {

  return films.slice(-4);
}
getTopFilms(films: Film[]): Film[] {
  return films.sort((film1, film2) => {
    return film2.stars - film1.stars;

  }).slice(0, 3);
}

}
