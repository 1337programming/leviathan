import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Modules
import {DialogModule} from 'primeng/primeng';
import {KioskCommonModule} from '../../common/common.module';

// Components
import {AddFundsComponent} from './add-funds.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';

// Directives

// Routes
import {routing} from './add-funds.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing, DialogModule, KioskCommonModule
  ],
  declarations: [AddFundsComponent, ConfirmationComponent],
  providers: []
})
export class AddFundsModule {
}
