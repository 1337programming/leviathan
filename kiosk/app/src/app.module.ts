import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Modules
import {AddFundsModule} from './modules/add-funds/add-funds.module';
import {AccountModule} from './modules/account/account.module';
import {QueueModule} from './modules/queue/queue.module';
import {GrowlModule, DialogModule} from 'primeng/primeng';
import {KioskCommonModule} from './common/common.module';
import {MockRetailModule} from './modules/mock-retail/mock-retail.module';

// Components
import {AppComponent} from './app.component';

// Routes
import {routing, appRoutingProviders} from './common/app.router';

// Services

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, GrowlModule, DialogModule, KioskCommonModule,
    AddFundsModule, AccountModule, QueueModule, MockRetailModule, routing
  ],
  declarations: [AppComponent],
  providers: [
    appRoutingProviders, // AuthGuard
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
