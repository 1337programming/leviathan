import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Components
import {AddFundsComponent} from './add-funds.component';

// Directives

// Routes
import {routing} from './add-funds.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing
  ],
  declarations: [AddFundsComponent],
  providers: []
})
export class AddFundsModule {
}
