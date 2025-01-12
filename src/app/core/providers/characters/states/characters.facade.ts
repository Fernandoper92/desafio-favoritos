import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Character } from 'src/app/core/interfaces/character';
import {
  clearState,
  getCharacters,
  getCharactersSuccess,
  updateCharacter,
} from './characters.actions';
import { selectCharacters, selectError } from './characters.selectors';

@Injectable({
  providedIn: 'root',
})
export class CharactersFacade {
  constructor(private store: Store) {}

  clearState() {
    this.store.dispatch(clearState());
  }

  getCharacters(name: string) {
    this.store.dispatch(getCharacters({ name }));
  }

  setCharacters(characters: Character[]) {
    this.store.dispatch(getCharactersSuccess({ characters }));
  }

  updateCharacter(characterUpdated: Character) {
    this.store.dispatch(
      updateCharacter({ id: characterUpdated.id, characterUpdated })
    );
  }

  selectCharacters$(): Observable<Character[]> {
    return this.store.select(selectCharacters).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }
}
