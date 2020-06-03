import { Film } from './film';

export interface Genre {
  id?: number;
  name: string;
  selected?: boolean;
    films?: Film[];
}
