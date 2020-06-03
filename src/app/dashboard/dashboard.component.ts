import { Component, OnInit } from '@angular/core';
import { FilmService } from './../services/film.service';
//import { UserService } from './../services/user.service';

import { Film } from '../models/film';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lastFilms: Film[];
  topFilms: Film[];


  constructor(

    private filmService: FilmService) { }

  ngOnInit() {


    this.filmService.getFilms().subscribe(response => {
      this.lastFilms = this.filmService.getLastFilms(response);
      this.topFilms = this.filmService.getTopFilms(response);
      console.log(this.lastFilms);
    console.log(this.topFilms);
    });





  }



}
