import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { CharactersFacade } from 'src/app/core/providers/characters/states/characters.facade';
import { FavoritesFacade } from 'src/app/core/providers/favorites/states/favorites.facade';
import { CardCharacterComponent } from 'src/app/shared/components/card-character/card-character.component';
import { CardEmptyComponent } from 'src/app/shared/components/card-empty/card-empty.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardCharacterComponent,
    CardEmptyComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnDestroy {
  destroyed$: Subject<void> = new Subject();
  error$: Observable<string>;
  favorites: Character[] = [];

  constructor(
    private favoritesFacade: FavoritesFacade,
    private characterFacade: CharactersFacade
  ) {
    this.favoritesFacade
      .selectFavorites$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((favorites: Character[]) => {
        console.log(favorites);
        this.favorites = favorites;
      });
    this.error$ = this.favoritesFacade
      .selectError$()
      .pipe(takeUntil(this.destroyed$));
  }

  removeFavorite(character: Character) {
    this.favoritesFacade.updateFavoritesIds(character.id);
    this.favoritesFacade.updateFavorites(character);
    this.characterFacade.updateCharacter({ ...character, favorite: false });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
