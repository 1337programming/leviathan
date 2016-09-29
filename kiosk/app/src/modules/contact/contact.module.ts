import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Components
import {ContactComponent} from "./contact.component";

// Directives

// Routes
import {routing} from './contact.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing
  ],
  declarations: [ContactComponent],
  providers: []
})
export class ContactModule {
}
