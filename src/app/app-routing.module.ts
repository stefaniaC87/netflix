import { EditGenreComponent } from './edit-genre/edit-genre.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { GenresComponent } from './genres/genres.component';
import { EditActorComponent } from './edit-actor/edit-actor.component';
import { AddActorComponent } from './add-actor/add-actor.component';
import { ActorsComponent } from './actors/actors.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { FilmsComponent } from './films/films.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'films', component: FilmsComponent
  },
  {
    path: 'films/add', component: AddFilmComponent
  },
  {
    path: 'films/edit', component: EditFilmComponent
  },
  {
    path: 'actors', component: ActorsComponent
  },
  {
    path: 'actors/add', component: AddActorComponent
  },
  {
    path: 'actors/edit', component: EditActorComponent
  },
  {
    path: 'genres', component: GenresComponent
  },
  {
    path: 'genres/add', component: AddGenreComponent
  },
  {
    path: 'genres/edit', component: EditGenreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
