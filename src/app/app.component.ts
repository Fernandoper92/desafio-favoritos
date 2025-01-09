import { Component, OnInit } from '@angular/core';
import { GetCharactersFacade } from './core/providers/states/characters.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desafio-mottu-favoritos';

  constructor(private getCharactersFacade: GetCharactersFacade) {}

  ngOnInit(): void {
    this.getCharactersFacade.getCharacters();
    this.getCharactersFacade
      .selectCharacters$()
      .subscribe((response) => console.log(response));
    this.getCharactersFacade.getCharactersFilterByName('Morty');
    this.getCharactersFacade
      .selectCharactersFilter$()
      .subscribe((response) => console.log(response));
  }
}
