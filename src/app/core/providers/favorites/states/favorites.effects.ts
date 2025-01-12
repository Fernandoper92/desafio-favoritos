import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { CharacterResponse } from 'src/app/core/interfaces/api-response/character-response';
import { Character } from 'src/app/core/interfaces/character';
import { transformCharactersResponse } from 'src/app/core/transform-api-response';
import { ApiService } from '../../../services/api.service';
import {
  getFavorites,
  getFavoritesErro,
  getFavoritesSuccess,
} from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  listFavoritesIds: number[] = [];

  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService
  ) {}

  getFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFavorites),
      switchMap((data: { listFavoritesIds: number[] }) => {
        this.listFavoritesIds = data.listFavoritesIds;
        const requests$: Observable<CharacterResponse>[] =
          data.listFavoritesIds.map((id) =>
            this.apiService.getCharacterById(id).pipe(
              take(1),
              catchError((error: Error) => {
                this.store.dispatch(
                  getFavoritesErro({ error: `${error.message} ${id}` })
                );
                return of();
              })
            )
          );

        return forkJoin(requests$).pipe(
          map((responses: CharacterResponse[]) => {
            responses = responses.filter((response) => response !== null);
            const characters: Character[] = transformCharactersResponse(
              responses,
              this.listFavoritesIds
            );
            console.log(characters);
            return getFavoritesSuccess({ listFavorites: characters });
          })
        );
      })
    )
  );
}
