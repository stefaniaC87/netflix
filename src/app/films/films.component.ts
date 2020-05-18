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
  films: Film[];
  text : string ="";


  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getFilms = this.filmService.getFilms();
  }
/*   search(event){
    let test=event.target.value;
    let scope = this;
    setTimeout(function(){
if(test.length >2){
  this.films= scope.filmService.getFilms().filter(x => x.title.toLowerCase().indexOf(test.toLowerCase))
}
    })

    this.films = this.filmService.getFilms().filter(x=>x.title.toLowerCase().indexOf(test.toLowerCase())>-1)
  } */
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
  }
}
