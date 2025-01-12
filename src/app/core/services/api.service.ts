import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response/api-response';
import { CharacterResponse } from '../interfaces/api-response/character-response';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_URL = 'https://rickandmortyapi.com/api/';

  constructor(private httpClient: HttpClient) {}

  getListCharacters(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.API_URL}/character`);
  }

  getCharacterById(id: number): Observable<CharacterResponse> {
    return this.httpClient.get<CharacterResponse>(
      `${this.API_URL}/character/${id}`
    );
  }

  getListCharactersFilterByName(name: string): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${this.API_URL}/character/?name=${name}`
    );
  }
}
