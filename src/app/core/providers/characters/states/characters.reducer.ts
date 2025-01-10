import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  clearState,
  getCharacters,
  getCharactersErro,
  getCharactersFilterByName,
  getCharactersFilterErro,
  getCharactersFilterSuccess,
  getCharactersSuccess,
} from './characters.actions';

export interface GetCharactersState {
  isLoading: boolean;
  characters: any[];
  charactersFilter: any[];
  error: string;
  errorFilter: string;
}

export const getCharactersKey = 'characters';

export const initialState: GetCharactersState = {
  isLoading: false,
  characters: [],
  charactersFilter: [],
  error: '',
  errorFilter: '',
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

    on(getCharactersErro, (state, { error }) => ({
      ...state,
      characters: [],
      isLoading: false,
      error,
    })),

    on(getCharactersFilterByName, (state) => ({
      ...state,
      isLoading: true,
      errorFilter: '',
    })),

    on(getCharactersFilterSuccess, (state, { charactersFilter }) => ({
      ...state,
      charactersFilter,
      isLoading: false,
      error: '',
    })),

    on(getCharactersFilterErro, (state, { errorFilter }) => ({
      ...state,
      charactersFilter: [],
      isLoading: false,
      errorFilter,
    }))
  );
