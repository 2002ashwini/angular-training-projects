import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductsApi } from '../../services/products-api';
import { CartsApi } from '../../../carts/services/carts-api';
import { ProductDetails } from '../product-details/product-details';
import { ProductListResponse } from '../../models/product-list-response';
import { ProductLite } from '../../../carts/models/cart-data';
import { SecurityApi } from '../../../security/services/security-api';

type Product = ProductLite & { description?: string; images?: string[] };

@Component({
  selector: 'bajaj-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, ProductDetails],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
})
export class ProductsList {
  private readonly _productApi = inject(ProductsApi);
  private readonly _route = inject(ActivatedRoute);
  private readonly _cartApi = inject(CartsApi);
  private readonly _security = inject(SecurityApi);
  private readonly _router = inject(Router);

  protected readonly title = 'Shoppping! Shopping! Shopping!';
  protected product!: ProductListResponse; 
  protected selectedProductId!: string;
  protected currentCategorySlug: string | null = null;

  
  private all: Product[] = [];

 
  protected page = 1;
  protected itemsPerPage = 8;
  protected q = '';

  private _subscription = new Subscription();

  ngOnInit(): void {
    const sub = this._route.queryParamMap
      .pipe(
        map(params => params.get('category')),
        switchMap(slug => {
          this.currentCategorySlug = slug;
          return slug
            ? this._productApi.getProductsByCategorySlug(slug)
            : this._productApi.getproducts();
        })
      )
      .subscribe({
        next: data => {
          this.product = data;
          this.all = (data?.data as Product[]) ?? [];
          this.page = 1;   
          this.q = '';     
        }
      });

    this._subscription.add(sub);
  }

  ngOnDestroy(): void { this._subscription.unsubscribe(); }

  protected onProductSelection(id: string): void { this.selectedProductId = id; }
  protected loggedIn() { return this._security.isLoggedIn(); }

  private isObjectId(id: string | undefined): id is string {
    return !!id && /^[a-f\d]{24}$/i.test(id);
  }

  protected addToCart(p: ProductLite): void {
    if (!this._security.isLoggedIn()) {
      const returnUrl = this._router.url || ('/products' + (this.currentCategorySlug ? `?category=${this.currentCategorySlug}` : ''));
      this._router.navigate(['/login'], { queryParams: { returnUrl } });
      return;
    }
    if (!this.isObjectId(p._id)) { console.error('Invalid _id', p); return; }
    this._cartApi.add({ _id: p._id, name: p.name, price: p.price, images: (p as any).images }, 1);
  }

  
  protected get filtered(): Product[] {
    const term = (this.q || '').trim().toLowerCase();
    if (!term) return this.all;
    return this.all.filter(p => {
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      return name.includes(term) || desc.includes(term);
    });
  }

  protected onSearchChange() {
    this.page = 1; 
  }
}
