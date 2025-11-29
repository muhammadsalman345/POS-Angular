import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  stats = [
    { title: 'Total Users', value: '12,402', icon: 'people', color: 'primary', change: '+12%' },
    { title: 'Revenue', value: '$45,678', icon: 'attach_money', color: 'success', change: '+8%' },
    { title: 'Orders', value: '1,234', icon: 'shopping_cart', color: 'warning', change: '+15%' },
    { title: 'Growth', value: '+15.2%', icon: 'trending_up', color: 'info', change: '+3%' }
  ];

  recentActivities = [
    { user: 'John Doe', action: 'placed an order', time: '2 min ago' },
    { user: 'Sarah Smith', action: 'registered', time: '5 min ago' },
    { user: 'Mike Johnson', action: 'updated profile', time: '10 min ago' },
    { user: 'Emily Davis', action: 'completed payment', time: '15 min ago' }
  ];
}