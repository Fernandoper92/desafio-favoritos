import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Character } from 'src/app/core/interfaces/character';
import {
  getFavorites,
  getFavoritesErro,
  getFavoritesSuccess,
  updateFavorite,
} from './favorites.actions';

export interface FavoritesState {
  isLoading: boolean;
  favorites: Character[];
  error: string;
}

export const favoritesKey = 'favorites';

export const initialState: FavoritesState = {
  isLoading: false,
  favorites: [],
  error: '',
};

export const FavoritesReducer: ActionReducer<FavoritesState, Action> =
  createReducer(
    initialState,
    on(getFavorites, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    })),

    on(getFavoritesSuccess, (state, { favorites }) => ({
      ...state,
      favorites: favorites,
      isLoading: false,
      error: '',
    })),

    on(updateFavorite, (state, { id, favoriteUpdated }) => ({
      ...state,
      favorites: state.favorites
        .map((favorite) =>
          favorite.id === id ? { ...favorite, ...favoriteUpdated } : favorite
        )
        .sort((a, b) => a.id - b.id),
    })),

    on(getFavoritesErro, (state, { error }) => ({
      ...state,
      favorites: [],
      isLoading: false,
      error,
    }))
  );
