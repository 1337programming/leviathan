import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Components
import {HomeComponent} from './home.component';

// Directives

// Routes
import {routing} from './home.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing
  ],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {
}
