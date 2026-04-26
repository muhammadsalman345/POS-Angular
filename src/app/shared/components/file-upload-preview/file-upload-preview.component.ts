import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload-preview',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './file-upload-preview.component.html',
  styleUrl: './file-upload-preview.component.scss'
})
export class FileUploadPreviewComponent {
  readonly label = input<string>('Upload image');
  readonly previewUrl = signal<string>('');

  preview(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(String(reader.result));
    reader.readAsDataURL(file);
  }
}
