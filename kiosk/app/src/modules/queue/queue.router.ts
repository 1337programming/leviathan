import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {AuthGuard} from '../../common/services/auth-guard.service';
import {QueueComponent} from './components/add-to-queue/add-to-queue.component';
import {QueueDashboardComponent} from './components/queue-dashboard/queue-dashboard.component';

const routes: Routes = [
  {path: 'queue', component: QueueComponent, canActivate: [AuthGuard]},
  {path: 'queue-dashboard', component: QueueDashboardComponent}
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
