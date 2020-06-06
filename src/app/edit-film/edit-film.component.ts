import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { GenreService } from '../services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../models/film';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {
  actors: Actor[];
  genres: Genre[];
  film: Film;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.filmService.getFilms().subscribe(films => {
      // Get the film by id in the url
      this.film = films.find(x => x.id == id);

      // Get actors list
      this.actorService.getActors().subscribe(actors => {
        this.actors = actors;

        // Dopo aver preso la lista degli attori, metto selected = true solo a quelli presenti dentro il film
        this.actors.map(x => {
          x.selected = this.film.cast.find(y => x.id == y.id) != null;
          return x;
        });

        // Metto gli attori in ordine alfabetico
        this.actors.sort((a, b) => {
          let nameA = (a.firstname + ' ' + a.lastname).toUpperCase();
          let nameB = (b.firstname + ' ' + b.lastname).toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });
      });

      // Get genres list
      this.genreService.getGenres().subscribe(genres => {
        this.genres = genres;

        // Dopo aver preso la lista dei generi, metto selected = true solo a quelli presenti dentro il film
        this.genres.map(x => {
          x.selected = this.film.genres.find(y => x.id == y.id) != null;
          return x;
        });

        // Metto i generi in ordine alfabetico
        this.genres.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
          if (nameA > nameB) {
            return 1;
          }
        });
      });

    });
  }

  editFilm() {
    // Inserisco attori e generi prima di inviare il film al servizio
    this.film.cast = this.actors.filter(x => x.selected);
    this.film.genres = this.genres.filter(x => x.selected);

    // Invio il film al servizio e se il risultato ha success = true allora torno alla lista film
    this.filmService.editFilm(this.film).subscribe(response => {
      if (response.success) {
        this.router.navigate(['films']);
      }
    })
  }
}
