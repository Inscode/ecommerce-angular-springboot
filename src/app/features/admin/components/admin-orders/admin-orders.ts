import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.scss',
})
export class AdminOrders {
  selectedStatus = signal('');

    orders = [
    { id: '#ORD-001', customer: 'Kamal Perera', phone: '0771234567', items: 3, total: 6750, status: 'Delivered', date: '2024-01-15', type: 'Retail' },
    { id: '#ORD-002', customer: 'Nimal Silva', phone: '0777654321', items: 1, total: 2400, status: 'Processing', date: '2024-01-15', type: 'Wholesale' },
    { id: '#ORD-003', customer: 'Saman Fernando', phone: '0712345678', items: 5, total: 12500, status: 'Pending', date: '2024-01-14', type: 'Wholesale' },
    { id: '#ORD-004', customer: 'Ravi Kumar', phone: '0769876543', items: 2, total: 4300, status: 'Delivered', date: '2024-01-14', type: 'Retail' },
    { id: '#ORD-005', customer: 'Amara Dissanayake', phone: '0751234567', items: 4, total: 8900, status: 'Cancelled', date: '2024-01-13', type: 'Retail' },
    { id: '#ORD-006', customer: 'Chaminda Perera', phone: '0723456789', items: 8, total: 24500, status: 'Processing', date: '2024-01-13', type: 'Wholesale' },
    { id: '#ORD-007', customer: 'Dilrukshi Silva', phone: '0784567890', items: 2, total: 3800, status: 'Pending', date: '2024-01-12', type: 'Retail' },
  ];

    statuses = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'];

  get filteredOrders() {
    if (!this.selectedStatus() || this.selectedStatus() === 'All') {
      return this.orders;
    }
    return this.orders.filter(o => o.status === this.selectedStatus());
  }

  setStatus(status: string) {
    this.selectedStatus.set(status === 'All' ? '' : status);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Delivered': return 'status--delivered';
      case 'Processing': return 'status--processing';
      case 'Pending': return 'status--pending';
      case 'Cancelled': return 'status--cancelled';
      default: return '';
    }
  }

  getTypeClass(type: string): string {
    return type === 'Wholesale' ? 'type--wholesale' : 'type--retail';
  }
}

