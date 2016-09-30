import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {GrowlModule} from 'primeng/primeng';

// Components
import {AccountComponent} from './account.component';
import {AboutPlanComponent} from './components/about-plan/about-plan.component';
import {UpdatePlanComponent} from './components/update-plan/update-plan.component';

// Directives

// Routes
import {routing} from './account.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, GrowlModule, routing
  ],
  declarations: [AccountComponent, AboutPlanComponent, UpdatePlanComponent],
  providers: []
})
export class AccountModule {
}
