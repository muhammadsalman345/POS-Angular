import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-template',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './invoice-template.component.html',
  styleUrl: './invoice-template.component.scss'
})
export class InvoiceTemplateComponent {
  readonly invoiceNumber = input<string>('INV-1001');
  readonly customer = input<string>('Walk-in customer');
  readonly product = input<string>('iPhone 13 Pro');
  readonly amount = input<number>(190000);
}
