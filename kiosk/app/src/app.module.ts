import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Modules
import {AddFundsModule} from './modules/add-funds/add-funds.module';
import {AccountModule} from './modules/account/account.module';
import {GrowlModule} from 'primeng/primeng';

// Components
import {AppComponent} from './app.component';
import {FooterComponent} from './common/components/footer/footer.component';
import {HeaderComponent} from './common/components/header/header.component';
import {ManualEntryComponent} from './common/components/manual-entry/manual-entry.component';
import {ScannerComponent} from './common/components/scanner/scanner.component';
import {VisitOptionsComponent} from './common/components/visit-options/visit-options.component';

// Routes
import {routing} from './app.router';

// Services

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, GrowlModule, AddFundsModule, AccountModule,
    routing
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent, ManualEntryComponent, ScannerComponent,
    VisitOptionsComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
