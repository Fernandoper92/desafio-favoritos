import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Info } from 'src/app/core/interfaces/api-response/info';
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
  pageInfo: Info;
  characters: Character[];
  error: string;
}

export const getCharactersKey = 'characters';

export const initialState: GetCharactersState = {
  isLoading: false,
  pageInfo: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
    pageSize: 0,
    pageIndex: 0,
  },
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

    on(getCharactersSuccess, (state, { characters, pageInfo }) => ({
      ...state,
      characters,
      pageInfo,
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
      characters: initialState.characters,
      pageInfo: initialState.pageInfo,
      isLoading: false,
      error,
    }))
  );
