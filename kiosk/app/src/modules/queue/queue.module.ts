import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Components
import {QueueComponent} from './components/add-to-queue/add-to-queue.component';
import {QueueDashboardComponent} from './components/queue-dashboard/queue-dashboard.component';

// Directives

// Routes
import {routing} from './queue.router';

// Services

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing
  ],
  declarations: [QueueComponent, QueueDashboardComponent],
  providers: []
})
export class QueueModule {
}
