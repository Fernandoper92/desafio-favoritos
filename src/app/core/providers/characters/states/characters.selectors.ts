import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Info } from 'src/app/core/interfaces/api-response/info';
import { Character } from 'src/app/core/interfaces/character';
import { getCharactersKey, GetCharactersState } from './characters.reducer';

export const charactersSelector =
  createFeatureSelector<GetCharactersState>(getCharactersKey);

export const selectIsLoading = createSelector(
  charactersSelector,
  (state: GetCharactersState): boolean => state.isLoading
);

export const selectCharacters = createSelector(
  charactersSelector,
  (state: GetCharactersState): Character[] => state.characters
);

export const selectPageInfo = createSelector(
  charactersSelector,
  (state: GetCharactersState): Info => state.pageInfo
);

export const selectError = createSelector(
  charactersSelector,
  (state: GetCharactersState): string => state.error
);
