import { Component, OnInit } from '@angular/core';
import { CharactersFacade } from './core/providers/characters/states/characters.facade';
import { FavoritesFacade } from './core/providers/favorites/states/favorites.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desafio-favoritos';
  favoritesCounter: number = 0;

  constructor(
    private getCharactersFacade: CharactersFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.getCharactersFacade.getCharacters('', '1');
    this.favoritesFacade.getFavorites();
    this.favoritesFacade.selectFavorites$().subscribe((favorites) => {
      this.favoritesCounter = favorites.length;
    });
  }
}
