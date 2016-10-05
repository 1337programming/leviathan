import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Modules
import {DialogModule} from 'primeng/primeng';

// Components
import {QueueComponent} from './components/queue/queue.component';
import {QueueSelect} from './components/queue-select/queue-select.component';
import {Arrow} from './components/arrow/arrow.component';
import {CallComponent} from './components/call/call.component';
import {PlansComponent} from './components/plans/plans.component';
import {ReviewComponent} from './components/review/review.component';

// Directives

// Routes
import {routing} from './mock-retail.router';

// Services
import {QueueService} from './services/queue.service';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, DialogModule, routing
  ],
  declarations: [QueueComponent, QueueSelect, Arrow, CallComponent, PlansComponent, ReviewComponent],
  providers: [QueueService]
})
export class MockRetailModule {
}
