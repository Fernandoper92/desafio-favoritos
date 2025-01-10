import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { getFavorites } from './favorites.actions';
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

  getFavorites() {
    const listFavoritesIds: string[] =
      this.favoritesService.getListFavoriteId();
    this.store.dispatch(getFavorites({ listFavoritesIds }));
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }

  selectFavorites$(): Observable<any> {
    return this.store.select(selectListFavorites).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }
}
