import { Component, inject, Input } from '@angular/core';
import { Subscription } from "rxjs";

import { ProductDetailsResponse } from "../../models/product-details-response";

import { ProductsApi } from "../../services/products-api";

@Component({
  selector: 'bajaj-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private _productsApi = inject(ProductsApi);
  private _subscription = new Subscription();
  protected product: ProductDetailsResponse;
  @Input() public productId: string;
  ngOnChanges() {
    this._subscription = this._productsApi.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.product = response;
        console.log(this.product)
      }
    });
  }
  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
