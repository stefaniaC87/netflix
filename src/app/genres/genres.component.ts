import { Component, OnInit } from '@angular/core';
import { Genre } from '../models/genre';
import { GenreService } from '../services/genre.service';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[];

  constructor(private genreService: GenreService, private filmService: FilmService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(response => {
      this.genres = response;

      this.filmService.getFilms().subscribe(films => {
        this.genres.map(genre => {
          genre.films = films.filter(film => film.genres.find(x => x.id == genre.id) != null);
          return genre;
        });

        this.genres.sort((a, b) => {
          let nameA = (a.name).toUpperCase();
          let nameB = (b.name).toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });
      });
    });
  }

}
