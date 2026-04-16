import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  shopName = environment.shopName;

  email = signal('');
  password = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  private returnUrl = '/';

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onEmailInput(event: Event) {
    this.email.set((event.target as HTMLInputElement).value);
    this.errorMessage.set('');
  }

  onPasswordInput(event: Event) {
    this.password.set((event.target as HTMLInputElement).value);
    this.errorMessage.set('');
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onSubmit() {
    if (!this.email()) {
      this.errorMessage.set('Please enter your email address');
      return;
    }
      if (!this.isValidEmail(this.email())) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }
    if (!this.password()) {
      this.errorMessage.set('Please enter your password');
      return;
    }
    if (this.password().length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({
      email: this.email(),
      password: this.password()

    }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if(response.role === 'ADMIN') {
          this.router.navigate(['/admin'])
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },

      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Invalid email or password'
        );
      }
    });
  }
 }
