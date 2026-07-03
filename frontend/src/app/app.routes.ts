import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {  path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)},
    {
    path: 'requests',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/requests/request-list/request-list')
        .then(m => m.RequestList)
  },
  { path: '**', redirectTo: 'login' }
];