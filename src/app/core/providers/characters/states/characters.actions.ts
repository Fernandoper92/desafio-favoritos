import { createAction, props } from '@ngrx/store';

export const clearState = createAction('[Get Characters] Clear State');

export const getCharacters = createAction('[Get Characters] Get Characters');

export const getCharactersSuccess = createAction(
  '[Get Characters] Get Characters Sucesso',
  props<{ characters: any[] }>()
);

export const getCharactersErro = createAction(
  '[Get Characters] Get Characters Error',
  props<{ error: string }>()
);

export const getCharactersFilterByName = createAction(
  '[Get Characters] Get Characters Filter By Name',
  props<{ name: string }>()
);

export const getCharactersFilterSuccess = createAction(
  '[Get Characters] Get Characters Filter Sucesso',
  props<{ charactersFilter: any[] }>()
);

export const getCharactersFilterErro = createAction(
  '[Get Characters] Get Characters Filter Error',
  props<{ errorFilter: string }>()
);
