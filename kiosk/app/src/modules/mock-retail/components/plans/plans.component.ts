import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QueueService} from '../../services/queue.service';
import {PLANS, PLAN} from './plans-mock';
import {User} from 'app/src/common/interfaces/firebase.interface';

let template = require('./views/plans.html');
let style = require('!!raw!sass!./views/plans.scss');

@Component({
  selector: 'plans',
  template: template,
  styles: [style]
})
export class PlansComponent implements OnInit {
  
  private plans: Array<PLAN>;
  private user: User;
  
  constructor(private router: Router, private queueService: QueueService) {
    this.plans = PLANS;
  }
  
  public ngOnInit() {
    this.user = this.queueService.getUser();
  }
  
  private selectPlan(plan: PLAN) {
    this.user.plan = plan;
  }
  
  private finish() {
    this.queueService.setNewPlan(this.user.plan);
    this.router.navigate(['/retail/review']);
  }
}
