import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersApi } from '../../services/orders-api';
import { Router } from '@angular/router';
import { Order } from '../../models/order';

@Component({
  selector: 'bajaj-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.html'
})
export class MyOrders {
  private orders = inject(OrdersApi);
  private router = inject(Router);

  data: Order[] = [];
  loading = true;

  ngOnInit() {
    this.orders.myOrders().subscribe({
      next: (res) => { this.data = res.orders; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  open(id: string) { this.router.navigate(['/orders', id]); }
}
