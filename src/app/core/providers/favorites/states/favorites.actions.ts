import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/core/interfaces/character';

export const getFavorites = createAction(
  '[Favorites] Get Favorite',
  props<{ listFavoritesIds: number[] }>()
);

export const getFavoritesSuccess = createAction(
  '[Favorites] Get Favorite Sucesso',
  props<{ favorites: Character[] }>()
);

export const updateFavorite = createAction(
  '[Get Characters] Update Favorite',
  props<{ id: number; favoriteUpdated: Character }>()
);

export const getFavoritesErro = createAction(
  '[Favorites] Get Favorite Error',
  props<{ error: string }>()
);
