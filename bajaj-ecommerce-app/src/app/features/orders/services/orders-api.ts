import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderRequest, Order, OrderResponse, OrdersListResponse } from '../models/order';

const BASE = 'http://localhost:9090/api/orders';

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);

  placeOrder(payload: CreateOrderRequest) {
    return this.http.post<OrderResponse>(BASE, payload);
  }

  myOrders() {
    return this.http.get<OrdersListResponse>(BASE);
  }

  getOrder(id: string) {
    return this.http.get<OrderResponse>(`${BASE}/${id}`);
  }
}
