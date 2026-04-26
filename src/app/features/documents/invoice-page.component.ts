import { Component } from '@angular/core';
import { InvoiceTemplateComponent } from '../../shared/components/invoice-template/invoice-template.component';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [InvoiceTemplateComponent],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.scss'
})
export class InvoicePageComponent {}
