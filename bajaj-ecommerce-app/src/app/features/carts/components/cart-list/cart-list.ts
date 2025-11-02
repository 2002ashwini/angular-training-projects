import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsApi } from '../../../carts/services/carts-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bajaj-cart-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css'
})
export class CartList {
  cartApi = inject(CartsApi);

  inc(id: string, q: number) { this.cartApi.setQuantity(id, q + 1); }
  dec(id: string, q: number) { this.cartApi.setQuantity(id, Math.max(0, q - 1)); }
  remove(id: string) { this.cartApi.remove(id); }
  clear() { this.cartApi.clear(); }
}
