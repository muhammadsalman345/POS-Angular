import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-public-marketplace-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatButtonModule],
  templateUrl: './public-marketplace-layout.component.html',
  styleUrl: './public-marketplace-layout.component.scss'
})
export class PublicMarketplaceLayoutComponent {}
