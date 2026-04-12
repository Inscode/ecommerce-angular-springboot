import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  shopName = environment.shopName;

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  password = signal('');
  confirmPassword = signal('');
  accountType = signal<'retail' | 'wholesale'>('retail');
  businessName = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  agreedToTerms = signal(false);

  constructor(private router: Router) {}

  onInput(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    switch(field) {
      case 'firstName': this.firstName.set(value); break;
      case 'lastName': this.lastName.set(value); break;
      case 'email': this.email.set(value); break;
      case 'phone': this.phone.set(value); break;
      case 'password': this.password.set(value); break;
      case 'confirmPassword': this.confirmPassword.set(value); break;
      case 'businessName': this.businessName.set(value); break;
    }
    this.errorMessage.set('');
  }

  setAccountType(type: 'retail' | 'wholesale') {
    this.accountType.set(type);
  }

    toggleTerms(event: Event) {
    this.agreedToTerms.set((event.target as HTMLInputElement).checked);
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone: string): boolean {
    return /^[0-9]{10}$/.test(phone.replace(/\s/g, ''));
  }

   get passwordStrength(): { label: string; color: string; width: string } {
    const p = this.password();
    if (!p) return { label: '', color: 'transparent', width: '0%' };
    if (p.length < 6) return { label: 'Too short', color: '#c0392b', width: '25%' };
    if (p.length < 8) return { label: 'Weak', color: '#e67e22', width: '50%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Fair', color: '#f1c40f', width: '75%' };
    return { label: 'Strong', color: '#27ae60', width: '100%' };
  }

   onSubmit() {
    if (!this.firstName()) { this.errorMessage.set('Please enter your first name'); return; }
    if (!this.lastName()) { this.errorMessage.set('Please enter your last name'); return; }
    if (!this.isValidEmail(this.email())) { this.errorMessage.set('Please enter a valid email address'); return; }
    if (this.phone() && !this.isValidPhone(this.phone())) { this.errorMessage.set('Please enter a valid 10 digit phone number'); return; }
    if (this.password().length < 6) { this.errorMessage.set('Password must be at least 6 characters'); return; }
    if (this.password() !== this.confirmPassword()) { this.errorMessage.set('Passwords do not match'); return; }
    if (this.accountType() === 'wholesale' && !this.businessName()) { this.errorMessage.set('Please enter your business name for wholesale registration'); return; }
    if (!this.agreedToTerms()) { this.errorMessage.set('Please agree to the terms and conditions'); return; }

    this.isLoading.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/auth/login']);
    }, 1500);
  }


 }
