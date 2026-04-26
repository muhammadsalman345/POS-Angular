import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { RESOURCE_CONFIGS, ResourceKind, ResourceRecord, ResourceService } from '../../../core/services/resource.service';

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  imports: [KeyValuePipe, TitleCasePipe, PageHeaderComponent],
  templateUrl: './resource-detail.component.html',
  styleUrl: './resource-detail.component.scss'
})
export class ResourceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly resources = inject(ResourceService);
  readonly title = signal('Detail');
  readonly record = signal<ResourceRecord>({});

  ngOnInit(): void {
    const kind = this.route.snapshot.data['kind'] as ResourceKind;
    const id = this.route.snapshot.paramMap.get('id') ?? '1';
    this.title.set(`${RESOURCE_CONFIGS[kind].title} Detail`);
    this.resources.get(kind, id).subscribe((record) => this.record.set(record));
  }
}
