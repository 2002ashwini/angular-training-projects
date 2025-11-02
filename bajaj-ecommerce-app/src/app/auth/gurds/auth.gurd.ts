import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityApi } from '../../features/security/services/security-api'; 

export const authGuard: CanActivateFn = (_route, state) => {
    const security = inject(SecurityApi);
    const router = inject(Router);

    if (security.isLoggedIn()) return true;

   
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
