import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Modules
import {GrowlModule, DialogModule} from 'primeng/primeng';

// Components
import {AccountComponent} from './account.component';
import {AboutPlanComponent} from './components/about-plan/about-plan.component';
import {UpdatePlanComponent} from './components/update-plan/update-plan.component';
import {AccountService}  from './services/account.service';

// Directives

// Routes
import {routing} from './account.router';
import {KioskCommonModule} from '../../common/common.module';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, GrowlModule, DialogModule, KioskCommonModule, routing
  ],
  declarations: [AccountComponent, AboutPlanComponent, UpdatePlanComponent],
  providers: [AccountService]
})
export class AccountModule {
}
