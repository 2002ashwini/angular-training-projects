import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { CartData, CartItem, ProductLite } from '../models/cart-data';
import { SecurityApi } from './../../security/services/security-api';

const LEGACY_KEY = 'app_cart'; 

@Injectable({ providedIn: 'root' })
export class CartsApi {
  private readonly security = inject(SecurityApi);
  private readonly router = inject(Router);

  private storageKey(): string {
    const email = (this.security.getEmail() || 'guest').toLowerCase();
    return `app_cart_${email}`;
  }

  private state$ = new BehaviorSubject<CartData>(this.read());
  cart$ = this.state$.asObservable();
  count$ = this.cart$.pipe(map(c => c.items.reduce((s, i) => s + i.quantity, 0)));
  amount$ = this.cart$.pipe(map(c => c.totalAmount));

  
  private read(): CartData {
    try {
      
      const perUserKey = this.storageKey();
      const existingPerUser = localStorage.getItem(perUserKey);
      if (!existingPerUser) {
        const legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          localStorage.setItem(perUserKey, legacy);
          localStorage.removeItem(LEGACY_KEY);
        }
      }

      const raw = localStorage.getItem(perUserKey);
      return raw ? (JSON.parse(raw) as CartData) : { items: [], totalAmount: 0 };
    } catch {
      return { items: [], totalAmount: 0 };
    }
  }

  private write(cart: CartData) {
    localStorage.setItem(this.storageKey(), JSON.stringify(cart));
    this.state$.next(cart);
  }

  private total(items: CartItem[]) {
    return items.reduce((s, it) => s + it.quantity * it.price, 0);
  }
  private requireLogin(): boolean {
    if (!this.security.isLoggedIn()) {
      const returnUrl = this.router.url || '/products';
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
      return false;
    }
    return true;
  }

  add(product: ProductLite, qty = 1) {
    if (!this.requireLogin()) return;
    const cart = this.read();
    const i = cart.items.findIndex(x => x.productId === product._id);
    if (i > -1) cart.items[i].quantity += qty;
    else cart.items.push({ productId: product._id, product, quantity: qty, price: product.price });
    cart.totalAmount = this.total(cart.items);
    this.write(cart);
  }

  setQuantity(productId: string, qty: number) {
    if (!this.requireLogin()) return;
    const cart = this.read();
    const i = cart.items.findIndex(x => x.productId === productId);
    if (i === -1) return;
    if (qty <= 0) cart.items.splice(i, 1);
    else cart.items[i].quantity = qty;
    cart.totalAmount = this.total(cart.items);
    this.write(cart);
  }

  remove(productId: string) {
    if (!this.requireLogin()) return;
    const cart = this.read();
    cart.items = cart.items.filter(x => x.productId !== productId);
    cart.totalAmount = this.total(cart.items);
    this.write(cart);
  }

  clear() {
    if (!this.requireLogin()) return;
    this.write({ items: [], totalAmount: 0 });
  }

  reloadForCurrentUser() {
    this.state$.next(this.read());
  }


  resetAfterLogout(clearLocal = false) {
    if (clearLocal) localStorage.removeItem(this.storageKey());
    this.state$.next({ items: [], totalAmount: 0 });
  }

  getSnapshot(): CartData {
  return this.state$.value;
}
}

