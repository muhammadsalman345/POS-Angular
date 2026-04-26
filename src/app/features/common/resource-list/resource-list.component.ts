import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SearchFilterBarComponent } from '../../../shared/components/search-filter-bar/search-filter-bar.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { RESOURCE_CONFIGS, ResourceConfig, ResourceKind, ResourceRecord, ResourceService } from '../../../core/services/resource.service';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CurrencyPipe, TitleCasePipe, RouterLink, MatButtonModule, MatIconModule, PageHeaderComponent, SearchFilterBarComponent, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.scss'
})
export class ResourceListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly resourceService = inject(ResourceService);
  readonly config = signal<ResourceConfig>(RESOURCE_CONFIGS.shops);
  readonly rows = signal<ResourceRecord[]>([]);
  readonly visibleRows = signal<ResourceRecord[]>([]);

  ngOnInit(): void {
    const kind = this.route.snapshot.data['kind'] as ResourceKind;
    const config = RESOURCE_CONFIGS[kind];
    this.config.set(config);
    this.resourceService.list(kind).subscribe((rows) => {
      this.rows.set(rows);
      this.visibleRows.set(rows);
    });
  }

  search(term: string): void {
    const value = term.toLowerCase();
    this.visibleRows.set(this.rows().filter((row) => JSON.stringify(row).toLowerCase().includes(value)));
  }

  cell(row: ResourceRecord, key: string): string | number | boolean | null | undefined {
    return row[key] as string | number | boolean | null | undefined;
  }

  money(row: ResourceRecord, key: string): string | number | null | undefined {
    const value = row[key];
    return typeof value === 'boolean' ? null : value;
  }

  isStatusColumn(key: string): boolean {
    return ['status', 'condition', 'ptaStatus', 'isActive', 'role', 'paymentMethod', 'saleType', 'complianceVerified'].includes(key);
  }
}
