import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() opened: boolean = true;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Products',
      icon: 'inventory_2',
      children: [
        { label: 'All Products', icon: 'list', route: '/products' },
        { label: 'Add Product', icon: 'add', route: '/products/new' },
        { label: 'Categories', icon: 'category', route: '/products/categories' }
      ]
    },
    {
      label: 'Users',
      icon: 'people',
      route: '/users'
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    }
  ];
}