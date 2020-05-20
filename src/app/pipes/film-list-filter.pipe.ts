import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film';

@Pipe({
  name: 'filmListFilter'
})
export class FilmListFilterPipe implements PipeTransform {
  timeout;

  transform(value: Film[], ...args: string[]): Film[] {
    let text = args[0];
    if(text.length>2){
      return value.filter(x => x.title.toLowerCase().indexOf(text.toLowerCase())>-1);
    }
    else{
      return value;
    }

  }

}
