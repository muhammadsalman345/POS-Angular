import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../core/auth/auth.service';
import { UserRole } from '../../../core/enums/user-role.enum';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  readonly userRole = UserRole;
  readonly loading = signal(false);
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['',Validators.email],
    role: [UserRole.SELLER, Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  submit(): void {
    const value = this.form.getRawValue();
    if (this.form.invalid || value.password !== value.confirmPassword) {
      this.form.markAllAsTouched();
      this.toast.error('Please check required fields and password confirmation');
      return;
    }
    this.loading.set(true);
    this.auth.register(value).subscribe({
      next: () => {
        this.toast.success('Account created successfully');
        this.auth.redirectAfterLogin();
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }
}
