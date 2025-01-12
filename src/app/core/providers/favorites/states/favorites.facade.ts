import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Character } from 'src/app/core/interfaces/character';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { getFavorites, getFavoritesSuccess } from './favorites.actions';
import { selectError, selectListFavorites } from './favorites.selectors';

@Injectable({
  providedIn: 'root',
})
export class FavoritesFacade {
  constructor(
    private store: Store,
    private favoritesService: FavoritesService
  ) {}

  updateFavoritesIds(id: number) {
    this.favoritesService.updateFavoritesIds(id);
  }

  getFavoritesIds(): number[] {
    return this.favoritesService.getFavoritesIds();
  }

  getFavorites() {
    const listFavoritesIds: number[] = this.favoritesService.getFavoritesIds();
    this.store.dispatch(getFavorites({ listFavoritesIds }));
  }

  updateFavorites(character: Character) {
    this.selectFavorites$()
      .pipe(take(1))
      .subscribe((favorites: Character[]) => {
        const ids = favorites.map((favorite) => favorite.id);
        if (ids.includes(character.id)) {
          favorites = favorites.filter(
            (favorite) => favorite.id !== character.id
          );
        } else {
          favorites = [...favorites, character];
        }
        favorites = favorites.sort((a, b) => a.id - b.id);
        this.store.dispatch(getFavoritesSuccess({ favorites }));
      });
  }

  selectFavorites$(): Observable<Character[]> {
    return this.store.select(selectListFavorites).pipe(distinctUntilChanged());
  }

  selectError$(): Observable<string> {
    return this.store.select(selectError).pipe(distinctUntilChanged());
  }
}
