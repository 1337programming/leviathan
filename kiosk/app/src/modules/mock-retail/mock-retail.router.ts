import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {QueueComponent} from './components/queue/queue.component';
import {QueueSelect} from './components/queue-select/queue-select.component';
import {PlansComponent} from './components/plans/plans.component';
import {ReviewComponent} from './components/review/review.component';

const routes: Routes = [
  {
    path: 'retail', children: [
    {path: '', redirectTo: 'queue', pathMatch: 'full'},
    {path: 'queue', component: QueueComponent},
    {path: 'queue-select', component: QueueSelect},
    {path: 'plans', component: PlansComponent},
    {path: 'review', component: ReviewComponent}
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
