import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounce, debounceTime, delay, take, tap } from 'rxjs';
import { ApiResponse } from 'src/app/core/interfaces/api-response/api-response';
import { Character } from 'src/app/core/interfaces/character';
import { transformCharactersResponse } from 'src/app/core/utils/transform-api-response';
import { ApiService } from '../../../services/api.service';
import { FavoritesFacade } from '../../favorites/states/favorites.facade';
import {
  getCharacters,
  getCharactersErro,
  getCharactersSuccess,
} from './characters.actions';

@Injectable()
export class GetCharactersEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService,
    private FavoritesFacade: FavoritesFacade
  ) {}

  getCharacters$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCharacters),
        tap((data: { name: string }) => {
          return this.apiService
            .getListCharactersFilterByName(data.name)
            .pipe(take(1))
            .subscribe({
              next: (response: ApiResponse) => {
                const listFavoritesId = this.FavoritesFacade.getFavoritesIds();
                let characters: Character[] = transformCharactersResponse(
                  response.results,
                  listFavoritesId
                );
                this.store.dispatch(
                  getCharactersSuccess({
                    characters,
                  })
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
}
