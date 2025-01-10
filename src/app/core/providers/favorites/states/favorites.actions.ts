import { createAction, props } from '@ngrx/store';

export const getFavorites = createAction(
  '[Get Favorite] Get Favorite',
  props<{ listFavoritesIds: any[] }>()
);

export const getFavoritesSuccess = createAction(
  '[Get Favorite] Get Favorite Sucesso',
  props<{ listFavorites: any[] }>()
);

export const getFavoritesErro = createAction(
  '[Get Favorite] Get Favorite Error',
  props<{ error: string }>()
);
