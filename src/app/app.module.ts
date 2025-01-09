import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {
  getCharactersKey,
  GetCharactersReducer,
} from './core/providers/states/characters.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BuscarCepEffects } from './core/providers/states/characters.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(GetCharactersReducer),
    StoreModule.forFeature(getCharactersKey, GetCharactersReducer),
    EffectsModule.forRoot(BuscarCepEffects),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
