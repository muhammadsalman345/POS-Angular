import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceRecord, ResourceService } from '../../../core/services/resource.service';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-marketplace-product-detail',
  standalone: true,
  imports: [CurrencyPipe, StatusBadgeComponent],
  templateUrl: './marketplace-product-detail.component.html',
  styleUrl: './marketplace-product-detail.component.scss'
})
export class MarketplaceProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly resources = inject(ResourceService);
  readonly product = signal<ResourceRecord>({});

  ngOnInit(): void {
    this.resources.get('marketplace-products', this.route.snapshot.paramMap.get('id') ?? '1').subscribe((product) => this.product.set(product));
  }

  text(key: string): string {
    return String(this.product()[key] ?? '');
  }

  money(key: string): string | number | null | undefined {
    const value = this.product()[key];
    return typeof value === 'boolean' ? null : value;
  }

  status(key: string): string | number | boolean | null | undefined {
    return this.product()[key];
  }
}
