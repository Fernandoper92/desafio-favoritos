import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_URL = 'https://rickandmortyapi.com/api/';

  constructor(private httpClient: HttpClient) {}

  getListCharacters(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/character`);
  }

  getCharacterById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/character/${id}`);
  }

  getListCharactersFilterByName(name: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/character/?name=${name}`);
  }
}
