import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ResourceRecord, ResourceService } from '../../../core/services/resource.service';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { SearchFilterBarComponent } from '../../../shared/components/search-filter-bar/search-filter-bar.component';

@Component({
  selector: 'app-marketplace-product-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MatButtonModule, StatusBadgeComponent, SearchFilterBarComponent],
  templateUrl: './marketplace-product-list.component.html',
  styleUrl: './marketplace-product-list.component.scss'
})
export class MarketplaceProductListComponent implements OnInit {
  private readonly resources = inject(ResourceService);
  readonly products = signal<ResourceRecord[]>([]);
  readonly visibleProducts = signal<ResourceRecord[]>([]);

  ngOnInit(): void {
    this.resources.list('marketplace-products').subscribe((products) => {
      this.products.set(products);
      this.visibleProducts.set(products);
    });
  }

  search(term: string): void {
    const value = term.toLowerCase();
    this.visibleProducts.set(this.products().filter((product) => JSON.stringify(product).toLowerCase().includes(value)));
  }

  text(product: ResourceRecord, key: string): string {
    return String(product[key] ?? '');
  }

  money(product: ResourceRecord, key: string): string | number | null | undefined {
    const value = product[key];
    return typeof value === 'boolean' ? null : value;
  }

  status(product: ResourceRecord, key: string): string | number | boolean | null | undefined {
    return product[key];
  }
}
