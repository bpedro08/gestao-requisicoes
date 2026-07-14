import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
  path: 'login',
  canActivate: [guestGuard],
  loadComponent: () =>
    import('./features/auth/login/login')
      .then(m => m.Login)
},
    {
    path: 'requests',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/requests/request-list/request-list')
        .then(m => m.RequestList)
  },
  {
    path: 'resources',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/resources/resource-list/resource-list')
        .then(m => m.ResourceList)
  },
  {
    path: 'approval',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/approval/approval-list/approval-list')
        .then(m => m.ApprovalList)
  },
  {
  path: 'dashboard',
  canActivate: [authGuard, adminGuard],
  loadComponent: () =>
    import('./features/dashboard/dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  { path: '**', redirectTo: 'login' }
];