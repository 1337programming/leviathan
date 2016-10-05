import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {AuthGuard} from '../../common/services/auth-guard.service';
import {QueueComponent} from './components/queue/queue.component';
import {QueueSelect} from './components/queue-select/queue-select.component';
import {PlansComponent} from './components/plans/plans.component';

const routes: Routes = [
  {path: 'retail', canActivate: [AuthGuard], children: [
    {path: '', component: QueueComponent, canActivate: [AuthGuard]},
    {path: 'queue', component: QueueComponent, canActivate: [AuthGuard]},
    {path: 'queue-select', component: QueueSelect},
    {path: 'plans', component: PlansComponent}
  ]}
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
