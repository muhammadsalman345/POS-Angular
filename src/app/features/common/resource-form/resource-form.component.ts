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
    this.fields().forEach((field) => this.form.addControl(field.key, this.fb.nonNullable.control('', Validators.required)));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    const payload = this.form.getRawValue();
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
      shops: [{ key: 'name', label: 'Shop name', type: 'text' }, { key: 'address', label: 'Address', type: 'text' }, { key: 'city', label: 'City', type: 'text' }, { key: 'area', label: 'Area', type: 'text' }, { key: 'phone', label: 'Phone', type: 'text' }, { key: 'description', label: 'Description', type: 'text' }],
      sellers: [{ key: 'name', label: 'Seller name', type: 'text' }, { key: 'phone', label: 'Phone', type: 'text' }, { key: 'cnic', label: 'CNIC', type: 'text' }],
      products: [{ key: 'brand', label: 'Brand', type: 'text' }, { key: 'model', label: 'Model', type: 'text' }, { key: 'imei1', label: 'IMEI', type: 'text' }, { key: 'expectedSalePrice', label: 'Expected sale price', type: 'number' }, { key: 'image', label: 'Product image', type: 'file' }],
      purchases: [{ key: 'receiptNumber', label: 'Receipt number', type: 'text' }, { key: 'purchasePrice', label: 'Purchase price', type: 'number' }, { key: 'purchaseDate', label: 'Purchase date', type: 'date' }],
      inventory: [{ key: 'status', label: 'Status', type: 'select', options: ['IN_STOCK', 'RESERVED', 'SOLD', 'UNDER_REPAIR'] }],
      customers: [{ key: 'name', label: 'Customer name', type: 'text' }, { key: 'phone', label: 'Phone', type: 'text' }, { key: 'cnic', label: 'CNIC', type: 'text' }],
      sales: [{ key: 'invoiceNumber', label: 'Invoice number', type: 'text' }, { key: 'salePrice', label: 'Sale price', type: 'number' }, { key: 'paymentMethod', label: 'Payment method', type: 'select', options: ['CASH', 'BANK', 'CARD', 'JAZZCASH', 'EASYPAISA'] }],
      expenses: [{ key: 'title', label: 'Title', type: 'text' }, { key: 'type', label: 'Type', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }],
      reports: [{ key: 'from', label: 'From', type: 'date' }, { key: 'to', label: 'To', type: 'date' }],
      users: [{ key: 'name', label: 'Name', type: 'text' }, { key: 'phone', label: 'Phone', type: 'text' }],
      'marketplace-shops': [],
      'marketplace-products': []
    };
    return base[kind];
  }
}
