import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lastFilms: Film[];
  topFilms: Film[];

  constructor(
    private filmService: FilmService
  ) { }

  ngOnInit() {
    this.filmService.getFilms().subscribe(response => {
      this.lastFilms = this.filmService.getLastFilms(response);
      this.topFilms = this.filmService.getTopFilms(response);
      console.log('Gli ultimi 4 film:', this.lastFilms);
      console.log('I 3 film più votati:', this.topFilms);
    });
  }
}
