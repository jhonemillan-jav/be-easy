import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageService } from 'app/_services/storage.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(StorageService).isLoggedIn();
};
