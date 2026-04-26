import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-receipt-template',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './receipt-template.component.html',
  styleUrl: './receipt-template.component.scss'
})
export class ReceiptTemplateComponent {
  readonly receiptNumber = input<string>('PUR-1001');
  readonly seller = input<string>('Ali Raza');
  readonly product = input<string>('iPhone 13 Pro');
  readonly amount = input<number>(165000);
}
