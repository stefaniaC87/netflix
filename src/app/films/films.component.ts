import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';



@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];


  search : string ="";



  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
    })
    /* this.films = this.filmService.getFilms(); */
    /* this.filmService.getFilms().subscribe(response =>{

    }); */
  }






  getCastList(cast: Actor[]): string {
    return cast.map(x => x.firstname + ' ' + x.lastname).join(',');
  }
  getGenreList(genres: Genre[]): string {
    return genres.map(x => x.name).join(',');
  }
  selectThisFilm(film: Film): void {
    // tslint:disable-next-line: deprecation
    event.stopPropagation();
    this.filmService.selectedFilm = film;
  }

  setVote(film: Film, vote: number){
    film.stars=vote;
    this.filmService.editFilm();
  }

  remove(film: Film): void{
    this.filmService.removeFilm(film.id);
  }
}
