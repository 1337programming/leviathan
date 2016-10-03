import {CommonModule, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Modules
import {GrowlModule, DialogModule} from 'primeng/primeng';

// Components
import {NotFoundComponent} from './components/404/404.component';
import {Fireworks} from './components/fireworks/fireworks.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {HelpComponent} from './components/help/help.component';
import {HomeComponent} from './components/home/home.component';
import {LoadingIndicator} from './components/loading-indicator/loading-indicator.component';
import {ManualEntryComponent} from './components/manual-entry/manual-entry.component';
import {ScannerComponent} from './components/scanner/scanner.component';
import {VisitOptionsComponent} from './components/visit-options/visit-options.component';
import {CompleteComponent} from './components/complete/complete.component';

// Directives
import {ForAnyOrder} from './directives/for-any-order.directive';

// Services
import {Audio} from './services/audio.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {Random} from './services/random.service';
import {Samples} from './services/samples.service';
import {AudioContextMock} from './mock/mock-audio-context';

// Router
import {routing, appRoutingProviders} from './app.router';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, GrowlModule, DialogModule, routing
  ],
  declarations: [NotFoundComponent, Fireworks, FooterComponent, HeaderComponent, HelpComponent, HomeComponent,
    LoadingIndicator, ManualEntryComponent, ScannerComponent, VisitOptionsComponent, CompleteComponent, ForAnyOrder],
  providers: [Audio, AuthService, AuthGuard, Random, Samples,
    appRoutingProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: 'audioContext',
      useValue: new (window['AudioContext'] || window['webkitAudioContext'] || AudioContextMock)
    },
  ],
  exports: [HelpComponent, ForAnyOrder, LoadingIndicator]
})
export class KioskCommonModule {
}
