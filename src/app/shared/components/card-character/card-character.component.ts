import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/core/interfaces/character';
import { BorderBoxComponent } from '../border-box/border-box.component';

@Component({
  selector: 'app-card-character',
  standalone: true,
  imports: [CommonModule, BorderBoxComponent],
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.scss'],
})
export class CardCharacterComponent {
  @Input() character: Character = {
    id: 0,
    image: '',
    name: '',
    species: '',
    origin: '',
    favorite: false,
  };

  @Output() toggleFavorite = new EventEmitter();
}
