import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { AdminProducts } from './components/admin-products/admin-products';
import { AdminOrders } from './components/admin-orders/admin-orders';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, CommonModule, AdminDashboard, AdminProducts, AdminOrders],
  templateUrl:'./admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  activeTab = signal('dashboard');

  menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'categories', label: 'Categories', icon: '🗂️' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
