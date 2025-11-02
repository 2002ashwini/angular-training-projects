import { Injectable, signal, effect, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';

  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  constructor(private zone: NgZone) {

    window.addEventListener('storage', (e) => {
      if (e.key === this.tokenKey) {
        this.zone.run(() => this.isLoggedIn.set(!!e.newValue));
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  refresh() {
    this.isLoggedIn.set(!!localStorage.getItem(this.tokenKey));
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn.set(true);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

  isLoggedInSync(): boolean {
    return this.isLoggedIn();
  }
}
