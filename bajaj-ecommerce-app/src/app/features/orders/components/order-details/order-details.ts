import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrdersApi } from '../../services/orders-api';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.html'
})
export class OrderDetails {
  private orders = inject(OrdersApi);
  private route = inject(ActivatedRoute);
  order?: Order;
  loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orders.getOrder(id).subscribe({
      next: res => { this.order = res.order; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
