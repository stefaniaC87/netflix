import { FilmService } from './../services/film.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lastFilms: Film[];
  topFilms: Film[];
  username: string;
  password: string;
  successLogin: boolean;

  constructor(
    public userService: UserService,
    private filmService: FilmService) { }

  ngOnInit(): void {

    this.userService.getLoggedUser();
    this.lastFilms = this.filmService.getLastFilms();
    this.topFilms = this.filmService.getTopFilms();
  }

login(){
  this.successLogin =this.userService.login(this.username, this.password);
}

}
