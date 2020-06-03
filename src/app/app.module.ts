import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { ActorsComponent } from './actors/actors.component';
import { AddActorComponent } from './add-actor/add-actor.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditActorComponent } from './edit-actor/edit-actor.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { EditGenreComponent } from './edit-genre/edit-genre.component';
import { FilmsComponent } from './films/films.component';
import { GenresComponent } from './genres/genres.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarsComponent } from './stars/stars.component';
import { FilmListFilterPipe } from './pipes/film-list-filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    AddActorComponent,
    AddFilmComponent,
    AddGenreComponent,
    DashboardComponent,
    EditActorComponent,
    EditFilmComponent,
    EditGenreComponent,
    FilmsComponent,
    GenresComponent,
    StarsComponent,
    FilmListFilterPipe,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
