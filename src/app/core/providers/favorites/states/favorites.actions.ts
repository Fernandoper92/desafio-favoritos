import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/core/interfaces/character';

export const getFavorites = createAction(
  '[Get Favorite] Get Favorite',
  props<{ listFavoritesIds: number[] }>()
);

export const getFavoritesSuccess = createAction(
  '[Get Favorite] Get Favorite Sucesso',
  props<{ listFavorites: Character[] }>()
);

export const getFavoritesErro = createAction(
  '[Get Favorite] Get Favorite Error',
  props<{ error: string }>()
);
