import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, forkJoin, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import {
  getFavorites,
  getFavoritesErro,
  getFavoritesSuccess,
} from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService
  ) {}

  getFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFavorites),
      switchMap((data: { listFavoritesIds: string[] }) => {
        const requests$: Observable<any>[] = data.listFavoritesIds.map((id) =>
          this.apiService.getCharacterById(id).pipe(
            take(1),
            catchError((error: Error) => {
              this.store.dispatch(getFavoritesErro({ error: `${error.message} ${id}` }));
              return of(null);
            })
          )
        );
  
        return forkJoin(requests$).pipe(
          map((responses: any[]) => {
            const listFavorites = responses.filter((response) => response !== null);
            return getFavoritesSuccess({ listFavorites });
          })
        );
      })
    )
  );
  
}
