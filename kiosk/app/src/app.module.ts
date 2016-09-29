import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Modules
import {HomeModule} from './modules/home/home.module';
import {AuctionModule} from './modules/auction/auction.module';
import {ContactModule} from './modules/contact/contact.module';

// Components
import {AppComponent} from './app.component';
import {FooterComponent} from './common/components/footer/footer.component';
import {HeaderComponent} from './common/components/header/header.component';

// Routes
import {routing} from './app.router';

// Services

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule,
    routing, HomeModule, AuctionModule, ContactModule
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
