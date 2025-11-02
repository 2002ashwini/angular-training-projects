import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityApi } from '../../features/security/services/security-api';

export const adminGuard: CanActivateFn = () => {
    const security = inject(SecurityApi);
    const router = inject(Router);

    if (security.isLoggedIn() && security.getRole() === 'admin') {
        return true;
    }

    router.navigate(['/login'], { queryParams: { returnUrl: '/categories/register' } });
    return false;
};
