import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  readonly status = input.required<string | number | boolean | null | undefined>();
  readonly label = computed(() => String(this.status() ?? 'N/A').replace(/_/g, ' '));
  readonly tone = computed(() => {
    const value = String(this.status() ?? '').toLowerCase();
    if (value.includes('sold') || value.includes('inactive') || value.includes('damaged') || value === 'false') {
      return 'danger';
    }
    if (value.includes('pending') || value.includes('reserved') || value.includes('repair') || value.includes('patched')) {
      return 'warning';
    }
    if (value.includes('active') || value.includes('approved') || value.includes('stock') || value === 'true') {
      return 'success';
    }
    return 'primary';
  });
}
