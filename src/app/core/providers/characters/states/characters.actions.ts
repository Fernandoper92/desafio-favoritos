import { createAction, props } from '@ngrx/store';
import { Info } from 'src/app/core/interfaces/api-response/info';
import { Character } from 'src/app/core/interfaces/character';

export const clearState = createAction('[Get Characters] Clear State');

export const getCharacters = createAction(
  '[Get Characters] Get Characters',
  props<{ name: string; page: string }>()
);

export const getCharactersSuccess = createAction(
  '[Get Characters] Get Characters Sucesso',
  props<{ characters: Character[]; pageInfo: Info }>()
);

export const updateCharacter = createAction(
  '[Get Characters] Update Character',
  props<{ id: number; characterUpdated: Character }>()
);

export const getCharactersErro = createAction(
  '[Get Characters] Get Characters Error',
  props<{ error: string }>()
);
