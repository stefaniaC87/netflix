import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';

const FILMS: Film[] = [
  {
    title: 'Twilight',
    description: 'tratto dal primo romanzo della saga Twilight scritta da Stephenie Meyer',
    director: 'Catherine Hardwicke',
    duration: '2h6m',
    releaseYear: 2008,
    stars: 4.5,
    cast: [
      {
        firstname: 'Kristen',
        lastname: 'Stewart'
      },
      {
        firstname: 'Robert',
        lastname: 'Pattinson'
      },
      {
        firstname: 'Peter',
        lastname: 'Facinelli'
      },
      {
        firstname: 'Taylor',
        lastname: 'Lautner'
      },
      {
        firstname: 'Billy',
        lastname: 'Burke'
      }
    ],
    genres: [
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
      }
    ],
    tags: 'fantasy'
  },
  {
    title: 'New Moon',
    description: 'tratto dal secondo romanzo della saga Twilight scritta da Stephenie Meyer',
    director: 'Chris Weitz',
    duration: '2h18m',
    releaseYear: 2009,
    stars: 4.5,
    cast: [
      {
        firstname: 'Kristen',
        lastname: 'Stewart'
      },
      {
        firstname: 'Robert',
        lastname: 'Pattinson'
      },
      {
        firstname: 'Peter',
        lastname: 'Facinelli'
      },
      {
        firstname: 'Taylor',
        lastname: 'Lautner'
      },
      {
        firstname: 'Billy',
        lastname: 'Burke'
      }
    ],
    genres: [
      {
        name: 'fantasy'
      },
      {
        name: 'sentimentale'
      }
    ],
    tags: 'fantasy, romantico'
  },
  {
    title: 'Eclipse',
    description: 'tratto dal terzo romanzo della saga Twilight scritta da Stephenie Meyer',
    director: 'David Slade',
    duration: '2h11m',
    releaseYear: 2010,
    stars: 4.4,
    cast: [
      {
        firstname: 'Kristen',
        lastname: 'Stewart'
      },
      {
        firstname: 'Robert',
        lastname: 'Pattinson'
      },
      {
        firstname: 'Peter',
        lastname: 'Facinelli'
      },
      {
        firstname: 'Taylor',
        lastname: 'Lautner'
      },
      {
        firstname: 'Billy',
        lastname: 'Burke'
      }
    ],
    genres: [
      {
        name: 'fantasy'
      },
      {
        name: 'sentimentale'
      },
      {
        name: 'paranormal'
      }
    ],
    tags: 'paranormal'
  },
  {
    title: 'Breaking Dawn',
    description: 'tratto dall\'ultimo romanzo della saga Twilight scritta da Stephenie Meyer',
    director: 'Bill Condon',
    duration: '1h57m',
    releaseYear: 2011,
    stars: 3,
    cast: [
      {
        firstname: 'Kristen',
        lastname: 'Stewart'
      },
      {
        firstname: 'Robert',
        lastname: 'Pattinson'
      },
      {
        firstname: 'Peter',
        lastname: 'Facinelli'
      },
      {
        firstname: 'Taylor',
        lastname: 'Lautner'
      },
      {
        firstname: 'Billy',
        lastname: 'Burke'
      }
    ],
    genres: [
      {
        name: 'fantasy'
      },
      {
        name: 'romantico'
      },
      {
        name: 'paranormal'
      }
    ],
    tags: 'fantasy, romantico, paranormal'
  },
  {
    title: 'Il codice Da Vinci',
    description: 'tratto dal romanzo scritto da Dan Brown con protagonista Robert Langdon',
    director: 'Ron Howard',
    duration: '2h54m',
    releaseYear: 2006,
    stars: 3.6,
    cast: [
      {
        firstname: 'Tom',
        lastname: 'Hanks'
      },
      {
        firstname: 'Audrey',
        lastname: 'Tautou'
      },
      {
        firstname: 'Paul',
        lastname: 'Bettany'
      },
      {
        firstname: 'Jean-Pierre',
        lastname: 'Marielle'
      },
    ],
    genres: [
      {
        name: 'thriller'
      },
      {
        name: 'giallo'
      }
    ],
    tags: 'thriller'
  },
  {
    title: 'Inferno',
    description: 'tratto dal romanzo omonimo scritto da Dan Brown',
    director: 'Ron Howard',
    duration: '2h1m',
    releaseYear: 2016,
    stars: 3.8,
    cast: [
      {
        firstname: 'Tom',
        lastname: 'Hanks'
      },
      {
        firstname: 'Felicity',
        lastname: 'Jones'
      },
      {
        firstname: 'Ben',
        lastname: 'Foster'
      },
    ],
    genres: [
      {
        name: 'thriller'
      },
      {
        name: 'giallo'
      }
    ],
    tags: 'film di mistero'
  },
  {
    title: 'Il signore degli anelli',
    description: 'trilogia colossal fantasy diretta dal regista Peter Jackson, basata sull\'anonimo romanzo scritto da J.R.R. Tolkien',
    director: 'Peter Jacksons',
    duration: '3h28m',
    releaseYear: 2001,
    stars: 4.5,
    cast: [
      {
        firstname: 'Elija',
        lastname: 'Wood'
      },
      {
        firstname: 'Ian',
        lastname: 'McKellen'
      },
      {
        firstname: 'Liv',
        lastname: 'Tyler'
      },
      {
        firstname: 'Olando',
        lastname: 'Bloom'
      },
      {
        firstname: 'Andy',
        lastname: 'Serkis'
      },
    ],
    genres: [
      {
        name: 'epico'
      },
      {
        name: 'fantasy'
      },
      {
        name: 'avventura'
      }
    ],
    tags: 'avventura'
  },
  {
    title: 'Pirati dei caraibi - La maledizione della prima luna',
    description: 'serie di film fantasy-avventura',
    director: 'Gore Verbinski',
    duration: '2h23m',
    releaseYear: 2003,
    stars: 5,
    cast: [],
    genres: [
      {
        name: 'avventura'
      },
      {
        name: 'commedia'
      },
      {
        name: 'fantasy'
      }
    ],
    tags: 'fantasy, avventura'
  },
  {
    title: 'Pirati dei caraibi - La maledizione del forziere fantasma',
    description: 'Jack Sparrow ha contratto un debito con Davey Jones e la sua ciurma di marinai.',
    director: 'Gore Verbinski',
    duration: '2h31m',
    releaseYear: 2006,
    stars: 4,
    cast: [
      {
        firstname: 'Johnny',
        lastname: 'Depp'
      },
      {
        firstname: 'Orlando',
        lastname: 'Bloom'
      },
      {
        firstname: 'Keira',
        lastname: 'Knightley'
      },
      {
        firstname: 'Geoffrey',
        lastname: 'Rush'
      },
      {
        firstname: 'Kevin',
        lastname: 'McNally'
      },
    ],
    genres: [
      {
        name: 'avventura'
      },
      {
        name: 'commedia'
      },
      {
        name: 'fantasy'
      }
    ],
    tags: 'avventura'
  },
  {
    title: 'Pirati dei caraibi - Ai confini del mondo',
    // tslint:disable-next-line: max-line-length
    description: 'Will Turner, Elizabeth Swann e Capitan Barbossa si imbarcano per unirsi ai pirati della fratellanza, per sconfiggere Lord Beckett della Compagnia delle Indie Orientali',
    director: 'Gore Verbinski',
    duration: '2h49m',
    releaseYear: 2007,
    stars: 4,
    cast: [
      {
        firstname: 'Johnny',
        lastname: 'Depp'
      },
      {
        firstname: 'Orlando',
        lastname: 'Bloom'
      },
      {
        firstname: 'Keira',
        lastname: 'Knightley'
      },
      {
        firstname: 'Geoffrey',
        lastname: 'Rush'
      },
      {
        firstname: 'Bill',
        lastname: 'Nighy'
      },
    ],
    genres: [
      {
        name: 'avventura'
      },
      {
        name: 'commedia'
      },
      {
        name: 'fantasy'
      }
    ],
    tags: 'avventura, fantasy'
  },
  {
    title: 'Pirati dei caraibi - Oltre i confini del mare',
    // tslint:disable-next-line: max-line-length
    description: 'Jack Sparrow e Barbossa partono alla ricerca della Fontana della giovinezza, ma scoprono che Barbanera e sua figlia hanno intrapreso lo stesso viaggio',
    director: 'Rob Marshall',
    duration: '2h17m',
    releaseYear: 2011,
    stars: 4.4,
    cast: [
      {
        firstname: 'Johnny',
        lastname: 'Depp'
      },
      {
        firstname: 'Penelope',
        lastname: 'Cruz'
      },
      {
        firstname: 'Ian',
        lastname: 'McShane'
      },
      {
        firstname: 'Geoffrey',
        lastname: 'Rush'
      },
      {
        firstname: 'Kevin',
        lastname: 'McNally'
      },
    ],
    genres: [
      {
        name: 'avventura'
      },
      {
        name: 'commedia'
      },
      {
        name: 'fantasy'
      }
    ],
    tags: 'fantasy, avventura'
  },
  {
    title: 'Pirati dei caraibi - La vendetta di Salazar',
    // tslint:disable-next-line: max-line-length
    description: 'Il capitano Salazar e il suo equipaggio riescono a uscire dal Triangolo del Diavolo. Jack Sparrow per salvarsi la pelle è il tridente di Poseidone, e si allea con il figlio di Will Turner che vuole salvare suo padre dalla maledizione che lo vincola' ,
    director: 'Espen Sandberg',
    duration: '2h33m',
    releaseYear: 2017,
    stars: 4.3,
    cast: [
      {
        firstname: 'Johnny',
        lastname: 'Depp'
      },
      {
        firstname: 'Javier',
        lastname: 'Bardem'
      },
      {
        firstname: 'Brenton',
        lastname: 'Thwaites'
      },
      {
        firstname: 'kaya',
        lastname: 'Scodelario'
      },
      {
        firstname: 'Geoffrey',
        lastname: 'Rush'
      },
    ],
    genres: [
      {
        name: 'avventura'
      },
      {
        name: 'commedia'
      },
      {
        name: 'fantasy'
      }
    ],
    tags: 'fantasy, avventura'
  },
  {
    title: 'Riverdale',
    // tslint:disable-next-line: max-line-length
    description: 'Serie televisiva basata sui fumetti della Archie Comics' ,
    director: 'Greg Berlanti',
    duration: '42m',
    releaseYear: 2017,
    stars: 4.3,
    cast: [
      {
        firstname: 'K.J.',
        lastname: 'Apa'
      },
      {
        firstname: 'Lili',
        lastname: 'Reinhart'
      },
      {
        firstname: 'Camila',
        lastname: 'Mendes'
      },
      {
        firstname: 'Cole',
        lastname: 'Sprouse'
      },
      {
        firstname: 'Madelaine',
        lastname: 'Petsch'
      },
      {
        firstname: 'Marisol',
        lastname: 'Nichols'
      },
      {
        firstname: 'Luke',
        lastname: 'Perry'
      },
      {
        firstname: 'Skeet',
        lastname: 'Ulrich'
      },
    ],
    genres: [
      {
        name: 'teen drama'
      },
      {
        name: 'crime'
      },
      {
        name: 'thriller'
      }
    ],
    tags: 'teen drama, mistery'
  },
  {
    title: 'Legacies',
    // tslint:disable-next-line: max-line-length
    description: 'serie televisiva di genere fantasy, ambientata a Mystic Falls e segue le vicende di Hope Mikelson, figlia di Klaus Mikaelson e Hayley Marshall ' ,
    director: 'Julie Plec',
    duration: '42m',
    releaseYear: 2018,
    stars: 4.3,
    cast: [
      {
        firstname: 'Danielle Rose',
        lastname: 'Russell'
      },
      {
        firstname: 'Aria',
        lastname: 'Shahghasemi'
      },
      {
        firstname: 'Kaylee',
        lastname: 'Bryant'
      },
      {
        firstname: 'Jenny',
        lastname: 'Boyd'
      },
      {
        firstname: 'Matt',
        lastname: 'Davis'
      },
    ],
    genres: [
      {
        name: 'horror'
      },
      {
        name: 'fantasy'
      },
      {
        name: 'sentimentale'
      },
      {
        name: 'teen drama'
      }
    ],
    tags: 'horror, fantasy, sentimentale, teen drama'
  },
  {
    title: 'Revolution',
    // tslint:disable-next-line: max-line-length
    description: 'A seguito di un misterioso evento, la Terra ritrova improvvisamente priva di energia elettrice. Quindici anni dopo, il mondo è radicalmente cambiato e gli individui sono costretti a lottare quotidianamente per la sopravvivenza ' ,
    director: 'Jon Favreau',
    duration: '41m',
    releaseYear: 2013,
    stars: 4.3,
    cast: [
      {
        firstname: 'Billy',
        lastname: 'Burke'
      },
      {
        firstname: 'Tracy',
        lastname: 'Spiridakos'
      },
      {
        firstname: 'Giancarlo',
        lastname: 'Esposito'
      },
      {
        firstname: 'Cak',
        lastname: 'Orth'
      },
      {
        firstname: 'Elizabeth',
        lastname: 'Mitchell'
      },
      {
        firstname: 'J.D.',
        lastname: 'Pardo'
      },
      {
        firstname: 'David',
        lastname: 'Lyonss'
      },
    ],
    genres: [
      {
        name: 'drammatico'
      },
      {
        name: 'fantascienza'
      },
      {
        name: 'azione'
      }
    ],
    tags: 'drammatico, fantascienza, azione'
  },
  {
    title: 'Supergirl',
    // tslint:disable-next-line: max-line-length
    description: 'Kara Zor-El, fuggita dal pianeta Krypton, viene inviata sulla Terra per proteggere il cugino Kal-El. La ragazza, dopo aver nascosto per anni i propri poteri, decide infine di usarli per salvare National City ' ,
    director: 'Greg Berlanti',
    duration: '42m',
    releaseYear: 2015,
    stars: 4.3,
    cast: [
      {
        firstname: 'Melissa',
        lastname: 'Benoist'
      },
      {
        firstname: 'Mehcad',
        lastname: 'Brooks'
      },
      {
        firstname: 'Chyler',
        lastname: 'Leigh'
      },
      {
        firstname: 'Jeremy',
        lastname: 'Jordan'
      },
      {
        firstname: 'David',
        lastname: 'Harewood'
      },
      {
        firstname: 'Chris',
        lastname: 'Wood'
      },
      {
        firstname: 'Katie',
        lastname: 'McGrath'
      },
      {
        firstname: 'Jesse',
        lastname: 'Rath'
      },
    ],
    genres: [
      {
        name: 'supereroi'
      },
      {
        name: 'azione'
      },
      {
        name: 'fantasy'
      }
    ],
    tags: 'supereroi, azione, fantasy'
  },
];

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Film[];
  selectedFilm: Film;
  newFilm: Film = {
    title: '',
    description: '',
    director: '',
    duration: '',
    releaseYear: 0,
    stars: 0,
    cast: [],
    genres: [],
    tags: ''
  };
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userService: UserService) { }

httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
  getFilms(): Observable<Film[]> {

    return this.http.get<Film[]>('http://netflix.cristiancarrino.com/film/read.php').pipe(
      tap(response => console.log(response)),

    );
    /* this.films = this.localStorage.retrieve('films') || FILMS;
    return of(this.films); */
  }

  addFilm(): void {
    let loggedUser = this.userService.getLoggedUser();
    let httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json' ,
        'Authorization': loggedUser.token
      })
    };
    console.log(this.newFilm);

    this.http.post<Film>('http://netflix.cristiancarrino.com/film/create.php', this.newFilm, this.httpOptions).subscribe(response => {
      console.log(response);
      this.getFilms().subscribe(response => this.films = response);




    });
    this.newFilm = {
      title: '',
      description: '',
      director: '',
      duration: '',
      releaseYear: 0,
      stars: 0,
      cast: [],
      genres: [],
      tags: ''
    };
  }
editFilm(): void {
  let loggedUser = this.userService.getLoggedUser();
  let httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json' ,
      'Authorization': loggedUser.token
    })
  };
  this.http.post<Film>('http://netflix.cristiancarrino.com/film/update.php', this.selectedFilm, this.httpOptions).subscribe(response => {
    console.log(response);
    this.getFilms().subscribe(response => this.films = response);
});
}
removeFilm(id: number): void {
  let loggedUser = this.userService.getLoggedUser();
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': loggedUser.token
    })
  };
  this.http.post<Film>('http://netflix.cristiancarrino.com/film/delete.php', {id: id}, this.httpOptions).subscribe(response => {
    console.log(response);
    this.getFilms().subscribe(response => this.films = response);
});
}
getLastFilms(films: Film[]): Film[] {

  return films.slice(-4);
}
getTopFilms(films: Film[]): Film[] {

  return films.sort((film1, film2) => {
    if (film1.stars > film2.stars) {
      return -1;
    }

    return 0;
  }).slice(0, 3);
}

}
