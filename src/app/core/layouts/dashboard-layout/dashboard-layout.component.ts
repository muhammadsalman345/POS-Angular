import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SIDEBAR_MENU } from '../../constants/sidebar-menu.constant';
import { UserRole } from '../../enums/user-role.enum';
import { LoadingService } from '../../services/loading.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, LoadingSpinnerComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  readonly auth = inject(AuthService);
  readonly loading = inject(LoadingService);
  readonly sidebarOpen = signal(false);
  private readonly router = inject(Router);

  readonly visibleMenu = computed(() => {
    const role = this.auth.currentUser()?.role ?? UserRole.BUYER;
    return SIDEBAR_MENU.filter((item) => item.roles.includes(role));
  });

  currentSection(): string {
    return this.router.url.split('/').filter(Boolean)[0]?.replace(/-/g, ' ') ?? 'dashboard';
  }
}
