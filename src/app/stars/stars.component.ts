import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faStar, IconDefinition,} from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const starsTotal = 5;

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnChanges {
  @Input() vote: number;
  @Input() canEdit: boolean;
  @Output() voteChanged = new EventEmitter();

  icons: IconDefinition[] = [];
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarEmpty = faStarEmpty;

  constructor() { }

  ngOnChanges(): void {
    this.icons = [];
    for (var i = 1; i <= starsTotal; i++) {
      if (this.vote >= i) {
        this.icons.push(this.faStar);
      } else if (this.vote >= (i - 0.5)) {
        this.icons.push(this.faStarHalfAlt);
      } else {
        this.icons.push(this.faStarEmpty);
      }
    }
  }

  setVote(vote: number) {
    event.stopPropagation();
    if (this.canEdit) {
      this.voteChanged.emit(vote);
    }
  }
}
