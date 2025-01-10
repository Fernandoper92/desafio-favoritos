import { Component } from '@angular/core';
import { NavButtonComponent } from '../nav-button/nav-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
