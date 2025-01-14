import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { Info } from 'src/app/core/interfaces/api-response/info';
import { Character } from 'src/app/core/interfaces/character';
import { CharactersFacade } from 'src/app/core/providers/characters/states/characters.facade';
import { FavoritesFacade } from 'src/app/core/providers/favorites/states/favorites.facade';
import { CardCharacterComponent } from 'src/app/shared/components/card-character/card-character.component';
import { CardEmptyComponent } from 'src/app/shared/components/card-empty/card-empty.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    CardCharacterComponent,
    CardEmptyComponent,
    InputComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  inputSubject = new Subject<string>();
  destroyed$: Subject<void> = new Subject();
  isLoading$: Observable<boolean> = new Observable();
  error$: Observable<string> = new Observable();
  input: string = '';
  characters: Character[] = [];
  pageInfo: Info = {
    count: 20,
    pages: 0,
    next: '',
    prev: '',
    pageSize: 20,
    pageIndex: 0,
  };

  constructor(
    private charactersFacade: CharactersFacade,
    private favoritesFacade: FavoritesFacade
  ) {
    this.charactersFacade
      .selectCharacters$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((characters) => {
        this.characters = characters;
      });
    this.isLoading$ = this.charactersFacade
      .selectIsLoading$()
      .pipe(takeUntil(this.destroyed$));
    this.error$ = this.charactersFacade
      .selectError$()
      .pipe(takeUntil(this.destroyed$));
    this.inputSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.charactersFacade.getCharacters(value, '1');
      });
    this.charactersFacade
      .selectPageInfo$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((pageInfo) => {
        this.pageInfo = {
          ...pageInfo,
          pageIndex: this.pageInfo.pageIndex,
          pageSize: this.pageInfo.pageSize,
        };
      });
  }

  onInputChange(value: string) {
    this.inputSubject.next(value);
  }
  toggleFavorite(character: Character) {
    const characterUpdated = { ...character, favorite: !character.favorite };
    this.favoritesFacade.updateFavoritesIds(character.id);
    this.favoritesFacade.updateFavorites(characterUpdated);
    this.charactersFacade.updateCharacter(characterUpdated);
  }

  handlePageEvent(event: PageEvent) {
    const nextPage = (event.pageIndex + 1).toString();
    this.pageInfo = { ...this.pageInfo, pageIndex: event.pageIndex };
    this.charactersFacade.getCharacters(this.input, nextPage);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
