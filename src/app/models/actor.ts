import { Film } from './film';

export interface Actor {
  id?: number;
  firstname: string;
  lastname: string;
  selected?: boolean;
    films?: Film[];
}
