import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {
  getCharacters,
  getCharactersErro,
  getCharactersFilterByName,
  getCharactersFilterErro,
  getCharactersFilterSuccess,
  getCharactersSuccess,
} from './characters.actions';

@Injectable()
export class BuscarCepEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService
  ) {}

  getCharacters$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCharacters),
        tap(() => {
          return this.apiService
            .getListCharacters()
            .pipe(take(1))
            .subscribe({
              next: (response: any) => {
                //TODO: criar função para transformar response em character
                this.store.dispatch(
                  getCharactersSuccess({ characters: response?.results })
                );
              },
              error: (error: Error) => {
                this.store.dispatch(
                  getCharactersErro({ error: error.message })
                );
              },
            });
        })
      ),
    { dispatch: false }
  );

  getCharactersFilterByName$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCharactersFilterByName),
        tap((data: { name: string }) => {
          return this.apiService
            .getListCharactersFilterByName(data.name)
            .subscribe({
              next: (response: any) => {
                //TODO: criar função para transformar response em character
                this.store.dispatch(
                  getCharactersFilterSuccess({
                    charactersFilter: response?.results,
                  })
                );
              },
              error: (error: Error) => {
                this.store.dispatch(
                  getCharactersFilterErro({ errorFilter: error.message })
                );
              },
            });
        })
      ),
    { dispatch: false }
  );
}
