import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {
  actors: Actor[];
  genres: Genre[];

  constructor(
    public filmService: FilmService,
    private actorService: ActorService,
    private genresService: GenreService) { }

  ngOnInit(): void {
    this.actors = this.actorService.getActors();
    this.genres = this.genresService.getGenres();

  }
  updateActors(checked : boolean, actor: Actor){
    if(checked){
      this.filmService.selectedFilm.cast.push(actor);
    }
    else{
      this.filmService.selectedFilm.cast = this.filmService.selectedFilm.cast.filter(x => x.lastname != actor.lastname) ;
    }
  }
  checkActor(actor : Actor){
    return this.filmService.selectedFilm.cast.find(x => x.lastname == actor.lastname);
  }

}
