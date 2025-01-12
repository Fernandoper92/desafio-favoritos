import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { CharactersFacade } from 'src/app/core/providers/characters/states/characters.facade';
import { FavoritesFacade } from 'src/app/core/providers/favorites/states/favorites.facade';
import { CardCharacterComponent } from 'src/app/shared/components/card-character/card-character.component';
import { CardEmptyComponent } from 'src/app/shared/components/card-empty/card-empty.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardCharacterComponent,
    CardEmptyComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  destroyed$: Subject<void> = new Subject();
  error$: Observable<string> = new Observable();
  input: FormControl = new FormControl('');
  characters: Character[] = [];

  constructor(
    private charactersFacade: CharactersFacade,
    private favoritesFacade: FavoritesFacade
  ) {
    // TODO: entender pq toda vez que volto nessa rota ele bate no observable
    this.charactersFacade
      .selectCharacters$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((characters) => {
        console.log(characters);
        this.characters = characters;
      });
    this.error$ = this.charactersFacade
      .selectError$()
      .pipe(takeUntil(this.destroyed$));
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.charactersFacade.getCharacters(value);
  }
  toggleFavorite(character: Character) {
    const characterUpdated = { ...character, favorite: !character.favorite };
    this.favoritesFacade.updateFavoritesIds(character.id);
    this.favoritesFacade.updateFavorites(characterUpdated);
    this.charactersFacade.updateCharacter(characterUpdated);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
