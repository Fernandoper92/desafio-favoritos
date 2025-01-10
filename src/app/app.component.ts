import { Component, OnInit } from '@angular/core';
import { GetCharactersFacade } from './core/providers/characters/states/characters.facade';
import { FavoritesFacade } from './core/providers/favorites/states/favorites.facade';
import { FavoritesService } from './core/services/favorites.service';

@Component({
  selector: 'app-root',
  // TODO: transformar o appComponent em standalone, vai precisar corrigir erro de bootstrap no appModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desafio-mottu-favoritos';

  constructor(
    private getCharactersFacade: GetCharactersFacade,
    private favoritesFacade: FavoritesFacade,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.getCharactersFacade.getCharacters();
    this.getCharactersFacade
      .selectCharacters$()
      .subscribe((response) => console.log(response));

    this.favoritesService.addFavoriteId('1');
    this.favoritesFacade.getFavorites();
    this.favoritesFacade
      .selectFavorites$()
      .subscribe((response) => console.log(response));

    this.getCharactersFacade.getCharactersFilterByName('Morty');
    this.getCharactersFacade
      .selectCharactersFilter$()
      .subscribe((response) => console.log(response));
  }
}
