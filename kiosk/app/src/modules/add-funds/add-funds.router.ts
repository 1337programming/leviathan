import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {AddFundsComponent} from './add-funds.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {AuthGuard} from '../../common/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'add-funds', canActivate: [AuthGuard], children: [
    {path: '', component: AddFundsComponent},
    {path: 'payment', component: AddFundsComponent},
    {path: 'confirmation', component: ConfirmationComponent}
  ]
  }
];

/**
 * Routing Providers for the App
 * @type {Array}
 */
export const appRoutingProviders: any[] = [];

/**
 * Routes for the App
 * @type {ModuleWithProviders}
 */
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
