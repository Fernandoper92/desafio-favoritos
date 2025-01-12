import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Character } from 'src/app/core/interfaces/character';
import {
  clearState,
  getCharacters,
  getCharactersErro,
  getCharactersSuccess,
  updateCharacter,
} from './characters.actions';

export interface GetCharactersState {
  isLoading: boolean;
  characters: Character[];
  error: string;
}

export const getCharactersKey = 'characters';

export const initialState: GetCharactersState = {
  isLoading: false,
  characters: [],
  error: '',
};

export const GetCharactersReducer: ActionReducer<GetCharactersState, Action> =
  createReducer(
    initialState,
    on(clearState, (): any => ({
      ...initialState,
    })),

    on(getCharacters, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    })),

    on(getCharactersSuccess, (state, { characters }) => ({
      ...state,
      characters,
      isLoading: false,
      error: '',
    })),

    on(updateCharacter, (state, { id, characterUpdated }) => ({
      ...state,
      characters: state.characters.map((character) =>
        character.id === id ? { ...character, ...characterUpdated } : character
      ),
    })),

    on(getCharactersErro, (state, { error }) => ({
      ...state,
      characters: [],
      isLoading: false,
      error,
    }))
  );
