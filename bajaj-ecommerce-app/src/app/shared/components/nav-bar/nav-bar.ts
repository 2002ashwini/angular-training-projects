import { Component, inject } from '@angular/core';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { SecurityApi } from '../../../features/security/services/security-api';
import { CartsApi } from '../../../features/carts/services/carts-api';

@Component({
  selector: 'bajaj-nav-bar',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private _router = inject(Router);
  private _securityApi = inject(SecurityApi);
  private _cartApi = inject(CartsApi);

  protected isLoggedIn = false;
  protected role: string | null = null;
  protected cartCount$!: Observable<number>;

  ngOnInit(): void {
  
    this.cartCount$ = this._cartApi.count$;

    
    this.isLoggedIn = this._securityApi.getToken() !== null;
    this.role = this.isLoggedIn ? this._securityApi.getRole() : null;

  
    this._router.events.subscribe({
      next: event => {
        if (event instanceof NavigationStart) {
          this.isLoggedIn = this._securityApi.getToken() !== null;
          this.role = this.isLoggedIn ? this._securityApi.getRole() : null;
        }
      }
    });
  }


  get loggedIn(): boolean {
    return this._securityApi.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this._securityApi.getRole() === 'admin';
  }


  logout(): void {
    this._securityApi.logout();
    this.isLoggedIn = false;
    this.role = null;
    this._cartApi.resetAfterLogout(); 
    this._router.navigate(['/login']);
  }
}
