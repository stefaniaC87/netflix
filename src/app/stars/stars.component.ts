import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { faStar, IconDefinition  } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty  } from '@fortawesome/free-regular-svg-icons';

const starsTotal = 5;
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent implements OnChanges {
  @Input() vote: number;
@Output() voteChanged = new EventEmitter();
  icons : IconDefinition[] = [];
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  starEmpty = faStarEmpty;

  constructor() { }



  ngOnChanges(): void {
    this.icons=[];
for(var i=1; i<=starsTotal; i++){
  if(this.vote >=i){
    this.icons.push(this.faStar);
  }
  else if(this.vote >=(i-0.5)){
    this.icons.push(this.faStarHalfAlt);
  }
  else{
    this.icons.push(this.starEmpty);
  }

}


}


}
