import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {ScannerComponent} from './common/components/scanner/scanner.component';
import {VisitOptionsComponent} from './common/components/visit-options/visit-options.component';

const routes: Routes = [
  {path: '', redirectTo: 'scan', pathMatch: 'full'},
  {path: 'scan', component: ScannerComponent},
  {path: 'visit-options', component: VisitOptionsComponent}
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
