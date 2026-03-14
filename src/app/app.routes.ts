import { Routes } from '@angular/router';
import { Login, } from './features/auth/login/login';
import { Home } from './features/dashboard/home/home';
import { AccountList } from './features/account/account-list/account-list';
import { TransactionHistory } from './features/transactions/transaction-history/transaction-history';
import { Summary } from './features/dashboard/summary/summary';
import { AdminCreateUser } from './features/admin-create-user/admin-create-user';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Login },

   {
    path: 'dashboard',
    component: Home,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', component: Summary },
      { path: 'account', component: AccountList },
      { path: 'transactions', component: TransactionHistory },
      { path: 'admin', component: AdminCreateUser }
    ]
  },

  { path: '**', redirectTo: '' }
];