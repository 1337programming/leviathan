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
import {HomeComponent} from './common/components/home/home.component';
import {ScannerComponent} from './common/components/scanner/scanner.component';
import {VisitOptionsComponent} from './common/components/visit-options/visit-options.component';
import {Fireworks} from './common/components/fireworks/fireworks.component';

// Routes
import {routing, appRoutingProviders} from './app.router';

// Services
import {AudioContextMock} from './common/mock/mock-audio-context';
import {Samples} from './common/services/samples.service';
import {Random} from './common/services/random.service';
import {Audio} from './common/services/audio.service';
import {AuthService} from './common/services/auth.service';
//Gaurd

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, GrowlModule, AddFundsModule, AccountModule,
    routing
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent, ManualEntryComponent, ScannerComponent, HomeComponent,
    VisitOptionsComponent, Fireworks],
  providers: [
    AuthService,
    appRoutingProviders, // AuthGuard
    Random,
    Samples,
    Audio,
    {provide: 'audioContext', useValue: new (window['AudioContext'] || window['webkitAudioContext'] || AudioContextMock)},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
