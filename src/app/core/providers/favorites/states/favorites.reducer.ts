import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  getFavorites,
  getFavoritesErro,
  getFavoritesSuccess,
} from './favorites.actions';

export interface FavoritesState {
  isLoading: boolean;
  listFavorites: any[];
  error: string;
}

export const favoritesKey = 'favorites';

export const initialState: FavoritesState = {
  isLoading: false,
  listFavorites: [],
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

    on(getFavoritesSuccess, (state, { listFavorites }) => ({
      ...state,
      listFavorites: listFavorites,
      isLoading: false,
      error: '',
    })),

    on(getFavoritesErro, (state, { error }) => ({
      ...state,
      listFavorites: [],
      isLoading: false,
      error,
    }))
  );
