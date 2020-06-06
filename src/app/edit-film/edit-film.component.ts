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
    private genreService: GenreService) { }

    ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');
      this.filmService.getFilms().subscribe(films => {

        this.film = films.find(x => x.id == id);

        // Get actors list
        this.actorService.getActors().subscribe(actors => {
          this.actors = actors;


          this.actors.map(x => {
            x.selected = this.film.cast.find(y => x.id == y.id) != null;
            return x;
          });


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


        this.genreService.getGenres().subscribe(genres => {
          this.genres = genres;


          this.genres.map(x => {
            x.selected = this.film.genres.find(y => x.id == y.id) != null;
            return x;
          });


          this.genres.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
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
 editFilm(){
   this.film.cast = this.actors.filter(x => x.selected);
   this.film.genres  = this.genres.filter(x => x.selected);

   this.filmService.editFilm(this.film).subscribe(response => {
     if(response.success){
       this.router.navigate(['films']);
     }
   })
 }



}
