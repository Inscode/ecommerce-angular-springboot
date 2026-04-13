import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  stats = [
    { label: 'Total Products', value: '20', change: '+3 this week', icon: '📦', color: '#3b82f6' },
    { label: 'Total Orders', value: '148', change: '+12 today', icon: '🛒', color: '#22c55e' },
    { label: 'Total Customers', value: '1,240', change: '+24 this month', icon: '👥', color: '#a855f7' },
    { label: 'Revenue (LKR)', value: '485,200', change: '+8% this month', icon: '💰', color: '#c9a84c' },
  ];

   recentOrders = [
    { id: '#ORD-001', customer: 'Kamal Perera', items: 3, total: 6750, status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Nimal Silva', items: 1, total: 2400, status: 'Processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Saman Fernando', items: 5, total: 12500, status: 'Pending', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Ravi Kumar', items: 2, total: 4300, status: 'Delivered', date: '2024-01-14' },
    { id: '#ORD-005', customer: 'Amara Dissanayake', items: 4, total: 8900, status: 'Cancelled', date: '2024-01-13' },
  ];

   topProducts = [
    { name: 'Gift Hamper Set', category: 'Gift Items', sales: 203, revenue: 710500, emoji: '🎁' },
    { name: 'Folding Umbrella', category: 'Umbrellas', sales: 167, revenue: 158650, emoji: '☂️' },
    { name: 'Non-Stick Frying Pan', category: 'Kitchenware', sales: 128, revenue: 236800, emoji: '🍳' },
    { name: 'LED Bulb Pack', category: 'Lighting', sales: 145, revenue: 123250, emoji: '💡' },
    { name: 'Plastic Storage Box', category: 'Plastic', sales: 110, revenue: 71500, emoji: '🧴' },
  ];

  getStatusClass(status: string):string {
    switch(status) {
      case 'Delivered': return 'status--delivered';
      case 'Processing': return 'status--processing';
      case 'Pending': return 'status--pending';
      case 'Cancelled': return 'status--cancelled';
      default: return '';
    }
  }
}
