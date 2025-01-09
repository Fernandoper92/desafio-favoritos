import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCharactersKey, GetCharactersState } from './characters.reducer';

export const selectGetCharacters =
  createFeatureSelector<GetCharactersState>(getCharactersKey);

export const selectIsLoading = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): boolean => state.isLoading
);

export const selectCharacters = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): any[] => state.characters
);

export const selectError = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): string => state.error
);

export const selectCharactersFilter = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): any[] => state.charactersFilter
);

export const selectErroFilter = createSelector(
  selectGetCharacters,
  (state: GetCharactersState): string => state.errorFilter
);
