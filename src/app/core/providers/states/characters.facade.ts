import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  clearState,
  getCharacters,
  getCharactersFilterByName,
} from './characters.actions';
import {
  selectCharacters,
  selectCharactersFilter,
  selectErroFilter,
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

  getCharacters() {
    this.store.dispatch(getCharacters());
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }

  selectCharacters$(): Observable<any> {
    return this.store.select(selectCharacters).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }

  getCharactersFilterByName(name: string) {
    this.store.dispatch(getCharactersFilterByName({ name }));
  }

  selectCharactersFilter$(): Observable<any[]> {
    return this.store
      .select(selectCharactersFilter)
      .pipe(distinctUntilChanged());
  }

  selectErrorFilter$(): Observable<string> {
    return this.store.select(selectErroFilter).pipe(distinctUntilChanged());
  }
}
