import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RESOURCE_CONFIGS, ResourceKind, ResourceService } from '../../../core/services/resource.service';
import { ToastService } from '../../../core/services/toast.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FileUploadPreviewComponent } from '../../../shared/components/file-upload-preview/file-upload-preview.component';

interface Field {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'file';
  options?: string[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, PageHeaderComponent, FileUploadPreviewComponent],
  templateUrl: './resource-form.component.html',
  styleUrl: './resource-form.component.scss'
})
export class ResourceFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly resources = inject(ResourceService);
  private readonly toast = inject(ToastService);
  readonly title = signal('Create Record');
  readonly kind = signal<ResourceKind>('shops');
  readonly fields = signal<Field[]>([]);
  readonly form = new FormGroup<Record<string, FormControl<string>>>({});

  ngOnInit(): void {
    const kind = this.route.snapshot.data['kind'] as ResourceKind;
    const isEdit = Boolean(this.route.snapshot.paramMap.get('id'));
    this.kind.set(kind);
    this.title.set(`${isEdit ? 'Edit' : 'Create'} ${RESOURCE_CONFIGS[kind].title}`);
    this.fields.set(this.buildFields(kind));
    this.fields().forEach((field) => {
      const validators = [
        ...(field.required === false ? [] : [Validators.required]),
        ...(field.minLength ? [Validators.minLength(field.minLength)] : []),
        ...(field.maxLength ? [Validators.maxLength(field.maxLength)] : [])
      ];
      this.form.addControl(field.key, this.fb.nonNullable.control(field.defaultValue ?? '', validators));
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    const payload = this.toPayload(this.kind(), this.form.getRawValue());
    if (this.kind() === 'sales' && !payload['customerId'] && !payload['customer']) {
      this.toast.error('Select a customer ID or enter a new customer name and phone');
      return;
    }
    const request = id
      ? this.resources.update(this.kind(), id, payload)
      : this.resources.create(this.kind(), payload);
    request.subscribe({
      next: () => {
        this.toast.success('Record saved successfully');
        void this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  private buildFields(kind: ResourceKind): Field[] {
    const base: Record<ResourceKind, Field[]> = {
      shops: [
        { key: 'name', label: 'Shop name', type: 'text' },
        { key: 'address', label: 'Address', type: 'text' },
        { key: 'city', label: 'City', type: 'text' },
        { key: 'area', label: 'Area', type: 'text', required: false },
        { key: 'phone', label: 'Phone', type: 'text', required: false },
        { key: 'description', label: 'Description', type: 'text', required: false }
      ],
      sellers: [
        { key: 'name', label: 'Seller name', type: 'text' },
        { key: 'fatherName', label: 'Father name', type: 'text', required: false },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'cnic', label: 'CNIC', type: 'text', minLength: 15, maxLength: 15 },
        { key: 'address', label: 'Address', type: 'text' }
      ],
      products: [
        { key: 'sellerId', label: 'Seller ID', type: 'number' },
        { key: 'brand', label: 'Brand', type: 'text' },
        { key: 'model', label: 'Model', type: 'text' },
        { key: 'variant', label: 'Variant', type: 'text', required: false },
        { key: 'imei1', label: 'IMEI 1', type: 'text' },
        { key: 'imei2', label: 'IMEI 2', type: 'text', required: false },
        { key: 'storage', label: 'Storage', type: 'text', required: false },
        { key: 'ram', label: 'RAM', type: 'text', required: false },
        { key: 'color', label: 'Color', type: 'text', required: false },
        { key: 'condition', label: 'Condition', type: 'select', options: ['NEW', 'LIKE_NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'DAMAGED'], defaultValue: 'GOOD' },
        { key: 'purchasePrice', label: 'Purchase price', type: 'number' },
        { key: 'expectedSalePrice', label: 'Expected sale price', type: 'number', required: false },
        { key: 'ptaStatus', label: 'PTA status', type: 'select', options: ['APPROVED', 'NOT_APPROVED', 'PATCHED', 'UNKNOWN'], defaultValue: 'UNKNOWN' },
        { key: 'purchaseDate', label: 'Purchase date', type: 'date', defaultValue: this.today() },
        { key: 'description', label: 'Description', type: 'text', required: false },
        { key: 'image', label: 'Product image', type: 'file', required: false }
      ],
      purchases: [
        { key: 'sellerId', label: 'Seller ID', type: 'number' },
        { key: 'brand', label: 'Brand', type: 'text' },
        { key: 'model', label: 'Model', type: 'text' },
        { key: 'imei1', label: 'IMEI 1', type: 'text' },
        { key: 'condition', label: 'Condition', type: 'select', options: ['NEW', 'LIKE_NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'DAMAGED'], defaultValue: 'GOOD' },
        { key: 'ptaStatus', label: 'PTA status', type: 'select', options: ['APPROVED', 'NOT_APPROVED', 'PATCHED', 'UNKNOWN'], defaultValue: 'UNKNOWN' },
        { key: 'purchasePrice', label: 'Purchase price', type: 'number' },
        { key: 'expectedSalePrice', label: 'Expected sale price', type: 'number', required: false },
        { key: 'purchaseDate', label: 'Purchase date', type: 'date', defaultValue: this.today() },
        { key: 'receiptNumber', label: 'Receipt number', type: 'text', required: false },
        { key: 'notes', label: 'Notes', type: 'text', required: false }
      ],
      inventory: [{ key: 'status', label: 'Status', type: 'select', options: ['IN_STOCK', 'RESERVED', 'SOLD', 'UNDER_REPAIR'] }],
      customers: [
        { key: 'name', label: 'Customer name', type: 'text' },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'cnic', label: 'CNIC', type: 'text', required: false, minLength: 15, maxLength: 15 },
        { key: 'address', label: 'Address', type: 'text', required: false }
      ],
      sales: [
        { key: 'productId', label: 'Product ID', type: 'number' },
        { key: 'customerId', label: 'Customer ID', type: 'number', required: false },
        { key: 'customerName', label: 'Customer name', type: 'text', required: false },
        { key: 'customerPhone', label: 'Customer phone', type: 'text', required: false },
        { key: 'customerCnic', label: 'Customer CNIC', type: 'text', required: false, minLength: 15, maxLength: 15 },
        { key: 'salePrice', label: 'Sale price', type: 'number' },
        { key: 'paymentMethod', label: 'Payment method', type: 'select', options: ['CASH', 'BANK', 'CARD', 'JAZZCASH', 'EASYPAISA'], defaultValue: 'CASH' },
        { key: 'saleType', label: 'Sale type', type: 'select', options: ['OFFLINE', 'ONLINE'], defaultValue: 'OFFLINE' },
        { key: 'warrantyDays', label: 'Warranty days', type: 'number', required: false },
        { key: 'invoiceNumber', label: 'Invoice number', type: 'text', required: false },
        { key: 'notes', label: 'Notes', type: 'text', required: false }
      ],
      expenses: [{ key: 'title', label: 'Title', type: 'text' }, { key: 'type', label: 'Type', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'description', label: 'Description', type: 'text', required: false }],
      reports: [{ key: 'from', label: 'From', type: 'date' }, { key: 'to', label: 'To', type: 'date' }],
      users: [{ key: 'name', label: 'Name', type: 'text' }, { key: 'phone', label: 'Phone', type: 'text' }],
      'marketplace-shops': [],
      'marketplace-products': []
    };
    return base[kind];
  }

  private toPayload(kind: ResourceKind, raw: ResourceRecord): ResourceRecord {
    const payload = this.clean(this.coerceNumbers(raw));
    if (kind === 'purchases') {
      return {
        sellerId: payload['sellerId'],
        product: this.clean({
          sellerId: payload['sellerId'],
          brand: payload['brand'],
          model: payload['model'],
          imei1: payload['imei1'],
          condition: payload['condition'],
          ptaStatus: payload['ptaStatus'],
          purchasePrice: payload['purchasePrice'],
          expectedSalePrice: payload['expectedSalePrice'],
          purchaseDate: payload['purchaseDate']
        }),
        purchase: this.clean({
          purchasePrice: payload['purchasePrice'],
          purchaseDate: payload['purchaseDate'],
          receiptNumber: payload['receiptNumber'],
          notes: payload['notes']
        })
      };
    }
    if (kind === 'sales') {
      const customer = this.clean({
        name: payload['customerName'],
        phone: payload['customerPhone'],
        cnic: payload['customerCnic']
      });
      return this.clean({
        ...payload,
        customer: !payload['customerId'] && customer['name'] && customer['phone'] ? customer : undefined,
        customerName: undefined,
        customerPhone: undefined,
        customerCnic: undefined
      });
    }
    return payload;
  }

  private coerceNumbers(record: ResourceRecord): ResourceRecord {
    const numberKeys = new Set(['sellerId', 'productId', 'customerId', 'purchasePrice', 'expectedSalePrice', 'salePrice', 'warrantyDays', 'amount']);
    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => {
        if (numberKeys.has(key) && value !== '' && value !== null && value !== undefined) {
          return [key, Number(value)];
        }
        return [key, value];
      })
    );
  }

  private clean(record: ResourceRecord): ResourceRecord {
    return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== '' && value !== null && value !== undefined));
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
