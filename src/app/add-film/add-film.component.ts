import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { Actor } from '../models/actor';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre';
import { Film } from '../models/film';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  actors: Actor[];
  genres: Genre[];
  pippo = console;
  film: Film;

  constructor(
    private router: Router,
    public filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService) { }

  ngOnInit() {
    this.resetFilm();
    this.actorService.getActors().subscribe(actors => {
      this.actors = actors;

      this.actors.map(x => {
        x.selected = false;
        return x;
      });

      this.actors.sort((a,b) => {
        let nameA = (a.firstname + ' ' + a.lastname).toUpperCase();
        let nameB = (b.firstname + ' ' + b.lastname).toUpperCase();
        if(nameA < nameB){
          return -1;
        }
        if(nameA > nameB){
          return 1;
        }
      });
    });

    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;

      this.genres.map(x => {
        x.selected = false;
        return x;
      });

      this.genres.sort((a,b) => {
let nameA = a.name.toUpperCase();
let nameB = b.name.toUpperCase();
if(nameA < nameB){
  return -1;
}
if(nameA > nameB) {
  return 1;
}
      });
    });

  }
  resetFilm(): void {
    this.film = {
      title: '',
      description: '',
      director: '',
      duration: '',
      releaseYear: 0,
      stars: 0,
      cast: [],
      genres: [],
      tags: ''
    }
  }

  addFilm(){
    this.film.cast = this.actors.filter(x => x.selected);
    this.film.genres = this.genres.filter(x => x.selected);
    this.filmService.addFilm(this.film).subscribe(response => {
      if(response.success){
        this.router.navigate(['films']);
      }
    })
  }


}
