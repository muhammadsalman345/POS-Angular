import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search-filter-bar.component.html',
  styleUrl: './search-filter-bar.component.scss'
})
export class SearchFilterBarComponent {
  readonly searchChange = output<string>();
  search = '';
}
