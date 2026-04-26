import { Component } from '@angular/core';
import { ReceiptTemplateComponent } from '../../shared/components/receipt-template/receipt-template.component';

@Component({
  selector: 'app-receipt-page',
  standalone: true,
  imports: [ReceiptTemplateComponent],
  templateUrl: './receipt-page.component.html',
  styleUrl: './receipt-page.component.scss'
})
export class ReceiptPageComponent {}
