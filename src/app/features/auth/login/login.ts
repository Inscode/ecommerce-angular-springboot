import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

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

  constructor(private router: Router) {}

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

    setTimeout(() => {
      this.isLoading.set(false);

      if(this.email() === 'admin@ghanim.lk' && this.password() === 'admin123') {
        this.router.navigate(['/admin']);
      } else if (this.email() === 'wholesale@ghanim.lk' && this.password() === 'wholesale123') {
        this.router.navigate(['/']);
      } else if (this.email() && this.password()) {
        this.router.navigate(['/'])
      } else {
        this.errorMessage.set('Invalid Email or password');
      }
    }, 1200);
  }
 }
