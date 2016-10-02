import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {VisitOptionsComponent} from './common/components/visit-options/visit-options.component';
import {HomeComponent} from './common/components/home/home.component';
import {ScannerComponent} from './common/components/scanner/scanner.component';
import {ManualEntryComponent} from './common/components/manual-entry/manual-entry.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'visit-options', component: VisitOptionsComponent},
  {path: 'identify', children: [
    {path: '', redirectTo: 'scan', pathMatch: 'full'},
    {path: 'scan', component: ScannerComponent},
    {path: 'manual-entry', component: ManualEntryComponent}
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
