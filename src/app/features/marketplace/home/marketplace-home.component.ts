import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-marketplace-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, StatCardComponent],
  templateUrl: './marketplace-home.component.html',
  styleUrl: './marketplace-home.component.scss'
})
export class MarketplaceHomeComponent {}
