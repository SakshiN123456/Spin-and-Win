import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Optionally: add logic to check if token is expired
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
