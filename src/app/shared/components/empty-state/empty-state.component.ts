import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  readonly icon = input<string>('inventory_2');
  readonly title = input<string>('No records found');
  readonly message = input<string>('Try changing filters or create a new record.');
}
