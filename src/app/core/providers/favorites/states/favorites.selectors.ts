import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Character } from 'src/app/core/interfaces/character';
import { favoritesKey, FavoritesState } from './favorites.reducer';

export const selectFavorites =
  createFeatureSelector<FavoritesState>(favoritesKey);

export const selectIsLoading = createSelector(
  selectFavorites,
  (state: FavoritesState): boolean => state.isLoading
);

export const selectListFavorites = createSelector(
  selectFavorites,
  (state: FavoritesState): Character[] => state.listFavorites
);

export const selectError = createSelector(
  selectFavorites,
  (state: FavoritesState): string => state.error
);
