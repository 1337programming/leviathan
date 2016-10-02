import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {AccountComponent} from './account.component';
import {AuthGuard} from 'app/src/common/services/auth-guard.service';

const routes: Routes = [
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]}
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
