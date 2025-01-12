import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Character } from 'src/app/core/interfaces/character';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { getFavorites, getFavoritesSuccess } from './favorites.actions';
import {
  selectError,
  selectIsLoading,
  selectListFavorites,
} from './favorites.selectors';

@Injectable({
  providedIn: 'root',
})
export class FavoritesFacade {
  constructor(
    private store: Store,
    private favoritesService: FavoritesService
  ) {}

  togglefavoriteId(id: number) {
    this.favoritesService.togglefavoriteId(id);
  }

  getListFavoritesId(): number[] {
    return this.favoritesService.getListFavoriteId();
  }

  getFavorites() {
    const listFavoritesIds: number[] =
      this.favoritesService.getListFavoriteId();
    this.store.dispatch(getFavorites({ listFavoritesIds }));
  }

  toggleFavorite(favoriteParam: Character) {
    this.selectFavorites$()
      .pipe(take(1))
      .subscribe((favorites: Character[]) => {
        console.log('favorites', favorites);
        console.log('favoriteParam', favoriteParam);
        const ids = favorites.map((favorite) => favorite.id);
        if (ids.includes(favoriteParam.id)) {
          favorites = favorites.filter(
            (favorite) => favorite.id !== favoriteParam.id
          );
        } else {
          favorites = [...favorites, favoriteParam];
        }
        this.store.dispatch(getFavoritesSuccess({ listFavorites: favorites }));
      });
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }

  selectFavorites$(): Observable<Character[]> {
    return this.store.select(selectListFavorites).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }
}
