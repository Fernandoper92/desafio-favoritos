import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Character } from 'src/app/core/interfaces/character';
import { getCharactersKey, GetCharactersState } from './characters.reducer';

export const selectGetCharacters =
  createFeatureSelector<GetCharactersState>(getCharactersKey);

export const selectIsLoading = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): boolean => state.isLoading
);

export const selectCharacters = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): Character[] => state.characters
);

export const selectError = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): string => state.error
);
