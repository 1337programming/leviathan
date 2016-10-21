import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Components
import { QueueComponent } from './components/add-to-queue/add-to-queue.component';
import { QueueDashboardComponent } from './components/queue-dashboard/queue-dashboard.component';
import {KioskCommonModule} from '../../common/common.module';


// Directives

// Routes
import { routing } from './queue.router';

// Services
import { QueueService } from './services/queue.service';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, routing, KioskCommonModule
  ],
  declarations: [QueueComponent, QueueDashboardComponent],
  providers: [QueueService]
})
export class QueueModule {
}
