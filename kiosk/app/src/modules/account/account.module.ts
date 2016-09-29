import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Components
import {AccountComponent} from './account.component';

// Directives

// Routes
import {routing} from './account.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing
  ],
  declarations: [AccountComponent],
  providers: []
})
export class AccountModule {
}
