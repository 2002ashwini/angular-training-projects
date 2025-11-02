// src/app/auth/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SecurityApi } from './../../features/security/services/security-api';

const LOGIN_API = '/api/auth/login';
const CART_PREFIXES = ['/api/cart', '/api/carts']; 

function pathOf(url: string): string {
    return url.startsWith('http') ? new URL(url).pathname : url;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const security = inject(SecurityApi);
    const router = inject(Router);

    const token = security.getToken();
    const p = pathOf(req.url);


    const authedReq = token && !p.startsWith(LOGIN_API)
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authedReq).pipe(
        catchError((err: HttpErrorResponse) => {
            const isCartCall = CART_PREFIXES.some(prefix => p.startsWith(prefix));
            const alreadyOnLogin = router.url?.startsWith('/login');

            if (err.status === 401 && isCartCall && !alreadyOnLogin) {
                security.logout();
                const returnUrl = router.url || '/';
                router.navigate(['/login'], { queryParams: { returnUrl } });
            }
            return throwError(() => err);
        })
    );
};
