import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService, OrderResponse } from '../../core/services/order.service';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss'
})
export class OrderSuccess implements OnInit {
  order = signal<OrderResponse | null>(null);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.orderService.getOrderById(id).subscribe({
      next: (order: OrderResponse) => {
        this.order.set(order);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}