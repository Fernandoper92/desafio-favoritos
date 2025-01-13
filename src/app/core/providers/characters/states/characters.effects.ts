import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
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
        tap((data: { name: string; page: string }) => {
          return this.apiService
            .getListCharactersFilterByName(data.name, data.page)
            .pipe(take(1))
            .subscribe({
              next: (response: ApiResponse) => {
                const listFavoritesId = this.FavoritesFacade.getFavoritesIds();
                const pageInfo = response.info;
                const characters: Character[] = transformCharactersResponse(
                  response.results,
                  listFavoritesId
                );
                this.store.dispatch(
                  getCharactersSuccess({
                    characters,
                    pageInfo,
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
