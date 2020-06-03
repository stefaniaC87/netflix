import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  faClock = faClock;
  faSearch = faSearch;
  faEllipsisV = faEllipsisV;
  faPlusCircle = faPlusCircle;
selectedFilm: Film;

  search : string ="";
openSearchField: boolean = false;
searchField : string = 'title';
loadingFilms: boolean;


  constructor(public userService: UserService,
    private filmService: FilmService) { }

  ngOnInit() {
    this.loadingFilms = true;
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
      this.shuffle(this.films);
      this.loadingFilms = false;
    });

  }
  shuffle(array : any[]){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while(0 != currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

  }
  setSearchField(searchField: string){
    this.searchField = searchField;
    this.openSearchField = false;
  }

  setVote(film: Film, vote: number){
    film.stars=vote;
    this.filmService.editFilm(film).subscribe(response => console.log(response))
  }

  remove(film: Film): void{
    this.filmService.removeFilm(film).subscribe(() => this.ngOnInit());
  }

  showPlot(film: Film){
    event.preventDefault();
    this.selectedFilm = film;
  }

hidePlot(){
  this.selectedFilm = null;
}


}
