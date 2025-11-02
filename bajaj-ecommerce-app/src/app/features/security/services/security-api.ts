// src/app/features/security/services/security-api.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const EMAIL_KEY = 'email';
// (add refresh token keys only if you implement them server-side)

@Injectable({ providedIn: 'root' })
export class SecurityApi {
  private http = inject(HttpClient);
  private readonly BASE = 'http://localhost:9090/api';

  /** Matches your backend: POST /api/users/login */
  authenticateCredentials(user: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<{ token: string; user: { email: string; role: string } }>(
        `${this.BASE}/auth/login`,
        user
      )
      .pipe(
        map((res) => {
          // Store what the backend actually returns
          if (res?.token) {
            localStorage.setItem(TOKEN_KEY, res.token);
            localStorage.setItem(ROLE_KEY, res.user?.role ?? '');
            localStorage.setItem(EMAIL_KEY, res.user?.email ?? '');
          }

          // Normalize to your AuthResponse shape
          const normalized: AuthResponse = {
            token: res?.token ?? '',
            refreshToken: '',                  // your backend doesn’t return this
            role: res?.user?.role ?? '',
            email: res?.user?.email ?? '',
            message: res?.token ? 'Login successful' : 'Invalid credentials',
            success: !!res?.token,
          };
          return normalized;
        }),
        catchError((err) => {
          const message =
            err?.error?.message ||
            (Array.isArray(err?.error?.errors) && err.error.errors[0]?.msg) ||
            err?.message ||
            'Login failed.';
          return throwError(() => ({ ...err, message }));
        })
      );
  }

  getToken(): string | null { return localStorage.getItem(TOKEN_KEY); }
  getRole(): string | null { return localStorage.getItem(ROLE_KEY); }
  getEmail(): string | null { return localStorage.getItem(EMAIL_KEY); }
  isLoggedIn(): boolean { return !!this.getToken(); }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }
}
