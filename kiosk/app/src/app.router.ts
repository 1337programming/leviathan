import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {ScannerComponent} from './common/components/scanner/scanner.component';


const routes: Routes = [
  {path: '', redirectTo: 'scan', pathMatch: 'full'},
  {path: 'scan', component: ScannerComponent}
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
