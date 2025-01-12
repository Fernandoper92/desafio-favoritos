import { Component, OnInit } from '@angular/core';
import { GetCharactersFacade } from './core/providers/characters/states/characters.facade';
import { FavoritesFacade } from './core/providers/favorites/states/favorites.facade';

@Component({
  selector: 'app-root',
  // TODO: transformar o appComponent em standalone, vai precisar corrigir erro de bootstrap no appModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desafio-mottu-favoritos';
  favoritesCounter: number = 0;

  constructor(
    private getCharactersFacade: GetCharactersFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.getCharactersFacade.getCharacters('');
    this.favoritesFacade.getFavorites();
    this.favoritesFacade.selectFavorites$().subscribe((favorites) => {
      this.favoritesCounter = favorites.length;
    });
  }
}
