import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Genre } from '../models/genre';
const GENRES: Genre[] = [
  {
    name: 'fantasy'
  },
  {
    name: 'romantico'
  },
  {
    name: 'avventura'
  },
  {
    name: 'drammatico'
  },
  {
    name: 'sentimentale'
  },
  {
    name: 'paranormal'
  },
  {
        name: 'thriller'
      },
      {
        name: 'giallo'
      },
      {
        name: 'epico'
      },
      {
        name: 'commedia'
      },
      {
        name: 'teen drama'
      },
      {
        name: 'crime'
      },
      {
        name: 'horror'
      },
      {
        name: 'fantascienza'
      },
      {
        name: 'azione'
      },
      {
        name: 'supereroi'
      },
];
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[];
  selectedGenre: Genre;
  newGenre: Genre = {
   name: '',
  };

  getGenres(): Genre[] {
    this.genres = this.localStorage.retrieve('genres') || GENRES;
    return this.genres;
  }
  addGenre(): void {
    this.genres.push(this.newGenre);
    this.localStorage.store('genres', this.genres);
    this.newGenre = {
      name : '',
    };
  }
editGenre(): void {
  this.localStorage.store('genres', this.genres);
  this.selectedGenre = null;
}

  constructor(private localStorage: LocalStorageService) { }


}
