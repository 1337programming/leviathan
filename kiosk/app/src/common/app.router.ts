import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {VisitOptionsComponent} from './components/visit-options/visit-options.component';
import {HomeComponent} from './components/home/home.component';
import {ScannerComponent} from './components/scanner/scanner.component';
import {ManualEntryComponent} from './components/manual-entry/manual-entry.component';
import {AuthGuard} from './services/auth-guard.service';
import {CompleteComponent} from './components/complete/complete.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'visit-options', component: VisitOptionsComponent},
  {path: 'complete', component: CompleteComponent},
  {path: 'identify', children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'scan', component: ScannerComponent},
    {path: 'manual-entry', component: ManualEntryComponent}
  ]}
];

/**
 * Routing Providers for the App
 * @type {Array}
 */
export const appRoutingProviders: any[] = [AuthGuard];

/**
 * Routes for the App
 * @type {ModuleWithProviders}
 */
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
