import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconTextComponent } from '../icon-text/icon-text.component';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [IconTextComponent, RouterModule],
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
})
export class NavButtonComponent {
  favoritesCounter = 0
}
