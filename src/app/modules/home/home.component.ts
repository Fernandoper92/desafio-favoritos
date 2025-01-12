import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { GetCharactersFacade } from 'src/app/core/providers/characters/states/characters.facade';
import { FavoritesFacade } from 'src/app/core/providers/favorites/states/favorites.facade';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  destroyed$: Subject<void> = new Subject();
  characters: Character[] = [];
  isLoading$: Observable<boolean>;
  error: Observable<string>;

  input: FormControl = new FormControl('');

  constructor(
    private getCharacterFacade: GetCharactersFacade,
    private favoritesFacade: FavoritesFacade
  ) {
    this.getCharacterFacade
      .selectCharacters$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((characters) => {
        this.characters = characters;
      });
    this.isLoading$ = this.getCharacterFacade
      .selectIsLoading$()
      .pipe(takeUntil(this.destroyed$));
    this.error = this.getCharacterFacade
      .selectError$()
      .pipe(takeUntil(this.destroyed$));
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.getCharacterFacade.getCharacters(value);
  }

  toggleFavorite(index: number, id: number) {
    this.favoritesFacade.togglefavoriteId(id);
    this.characters = this.characters.map((character, i) => {
      if (i === index) {
        this.favoritesFacade.toggleFavorite(character);
        return { ...character, favorite: !character.favorite };
      } else {
        return character;
      }
    });
  }
}
