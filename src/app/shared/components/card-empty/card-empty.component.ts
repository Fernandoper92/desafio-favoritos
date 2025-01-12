import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BorderBoxComponent } from '../border-box/border-box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-empty',
  standalone: true,
  imports: [CommonModule,BorderBoxComponent],
  templateUrl: './card-empty.component.html',
  styleUrls: ['./card-empty.component.scss'],
})
export class CardEmptyComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() button: string = '';
  @Output() btnClick = new EventEmitter();
}
