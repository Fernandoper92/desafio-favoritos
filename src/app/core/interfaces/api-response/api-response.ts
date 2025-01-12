import { CharacterResponse } from './character-response';
import { Info } from './info';

export interface ApiResponse {
  info: Info;
  results: CharacterResponse[];
}
