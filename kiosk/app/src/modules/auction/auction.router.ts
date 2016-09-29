import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {AuctionComponent} from './auction.component';
import {ReceiptComponent} from './components/receipt/receipt.component';

const routes: Routes = [
  {path: 'auction', children: [
    {path: '', component: AuctionComponent},
    {path: 'receipt', component: ReceiptComponent}
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
