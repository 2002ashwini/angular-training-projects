export interface ProductLite {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  description?: string;
}

export interface CartItem {
  productId: string;
  product?: ProductLite;   
  quantity: number;
  price: number;           
}

export interface CartData {
  items: CartItem[];
  totalAmount: number;
}
