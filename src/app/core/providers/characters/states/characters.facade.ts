import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Info } from 'src/app/core/interfaces/api-response/info';
import { Character } from 'src/app/core/interfaces/character';
import {
  clearState,
  getCharacters,
  updateCharacter,
} from './characters.actions';
import {
  selectCharacters,
  selectError,
  selectIsLoading,
  selectPageInfo,
} from './characters.selectors';

@Injectable({
  providedIn: 'root',
})
export class CharactersFacade {
  constructor(private store: Store) {}

  clearState() {
    this.store.dispatch(clearState());
  }

  getCharacters(name: string, page: string) {
    this.store.dispatch(getCharacters({ name, page }));
  }

  updateCharacter(characterUpdated: Character) {
    this.store.dispatch(
      updateCharacter({ id: characterUpdated.id, characterUpdated })
    );
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }

  selectCharacters$(): Observable<Character[]> {
    return this.store.select(selectCharacters).pipe(distinctUntilChanged());
  }

  selectPageInfo$(): Observable<Info> {
    return this.store.select(selectPageInfo).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }
}
