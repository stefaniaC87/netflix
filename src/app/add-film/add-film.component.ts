import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { Actor } from '../models/actor';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  actors: Actor[];
  genres: Genre[];
  pippo = console;

  constructor(
    public filmService: FilmService,
    private actorService: ActorService,
    private genresService: GenreService) { }

  ngOnInit(): void {
    this.actors = this.actorService.getActors();
    this.genres = this.genresService.getGenres();

  }
  addGenre(checked: boolean, genre: Genre){
    if(checked){
      this.filmService.newFilm.genres.push(genre);

    }
    else{
      this.filmService.newFilm.genres = this.filmService.newFilm.genres.filter(x => x.name != genre.name);

    }
  }

}
