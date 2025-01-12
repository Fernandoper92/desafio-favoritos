import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetCharactersEffects } from './core/providers/characters/states/characters.effects';
import {
  getCharactersKey,
  GetCharactersReducer,
} from './core/providers/characters/states/characters.reducer';
import { FavoritesEffects } from './core/providers/favorites/states/favorites.effects';
import {
  favoritesKey,
  FavoritesReducer,
} from './core/providers/favorites/states/favorites.reducer';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(getCharactersKey, GetCharactersReducer),
    StoreModule.forFeature(favoritesKey, FavoritesReducer),
    EffectsModule.forRoot([GetCharactersEffects, FavoritesEffects]),
    StoreDevtoolsModule.instrument({ logOnly: false }),
    HeaderComponent,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
