import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersApi } from '../../services/orders-api';
import { CreateOrderRequest } from '../../models/order';
import { CartsApi } from '../../../carts/services/carts-api';

@Component({
  selector: 'bajaj-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html'
})
export class Checkout {
  private orders = inject(OrdersApi);
  private router = inject(Router);
  private carts = inject(CartsApi);

  model: CreateOrderRequest = {
    paymentMethod: 'COD',
    shippingAddress: { fullName: '', phone: '', line1: '', city: '', state: '', postalCode: '' },
    shipping: 0
  };
  placing = false;
  error = '';

 submit() {
  this.error = '';
  this.placing = true;

  this.orders.placeOrder(this.model).subscribe({
    next: (res: any) => {
      const id = res?.order?._id ?? res?._id;   
      if (id) {
        this.carts.clear();                  
        this.router.navigate(['/orders', id]);
      } else {
        this.error = 'Order placed but no order id was returned.';
        this.placing = false;
      }
    },
    error: (e) => {
      this.error =
        e?.error?.error ||
        e?.error?.message ||
        e?.message ||
        'Failed to place order.';
      this.placing = false;
    },
  });
}

}
