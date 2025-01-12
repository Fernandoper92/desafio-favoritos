import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Character } from 'src/app/core/interfaces/character';
import {
  clearState,
  getCharacters,
  getCharactersSuccess,
} from './characters.actions';
import {
  selectCharacters,
  selectError,
  selectIsLoading,
} from './characters.selectors';

@Injectable({
  providedIn: 'root',
})
export class GetCharactersFacade {
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

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }

  selectCharacters$(): Observable<Character[]> {
    return this.store.select(selectCharacters).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }
}
