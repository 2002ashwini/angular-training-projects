export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
}

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'COD' | 'ONLINE';
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD' | 'ONLINE';
  shipping?: number;
}

export interface OrdersListResponse { orders: Order[]; }
export interface OrderResponse { order: Order; }
