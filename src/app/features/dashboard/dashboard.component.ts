import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, PageHeaderComponent, StatCardComponent, StatusBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly stats = [
    { label: 'Today Sales', value: 'Rs. 190K', icon: 'point_of_sale', tone: 'success' as const },
    { label: 'Inventory Value', value: 'Rs. 8.4M', icon: 'inventory_2', tone: 'primary' as const },
    { label: 'Low Stock', value: 12, icon: 'warning', tone: 'warning' as const },
    { label: 'Net Profit', value: 'Rs. 240K', icon: 'trending_up', tone: 'success' as const }
  ];
  readonly sales = ['INV-1001', 'INV-1002', 'INV-1003'];
  readonly purchases = ['PUR-1001', 'PUR-1002', 'PUR-1003'];
}
