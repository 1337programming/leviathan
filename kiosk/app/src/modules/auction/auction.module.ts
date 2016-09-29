import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

//Modules
import {SplitButtonModule, TooltipModule, TabMenuModule, GrowlModule, DialogModule,
  ButtonModule} from 'primeng/primeng';

// Components
import {AuctionComponent} from './auction.component';
import {HouseComponent} from './components/house/house.component';
import {CustomerComponent} from './components/customer/customer.component';
import {AdvanceSearchForm} from './components/advance-search-form/advance-search-form.component';
import {ReceiptComponent} from './components/receipt/receipt.component';
import {UserInfoComponent} from './components/user-info/user-info.component';

// Directives

// Routes
import {routing} from './auction.router';

// Services
import {AuctionService} from './services/auction.service';
import {ReceiptService} from './components/receipt/services/receipt.service';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpModule, routing, TabMenuModule, SplitButtonModule, GrowlModule,
    TooltipModule, DialogModule, ButtonModule
  ],
  declarations: [AuctionComponent, HouseComponent, CustomerComponent, AdvanceSearchForm, ReceiptComponent,
    UserInfoComponent],
  providers: [AuctionService, ReceiptService]
})
export class AuctionModule {
}
