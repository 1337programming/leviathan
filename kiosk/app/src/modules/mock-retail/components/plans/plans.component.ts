import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QueueService} from '../../services/queue.service';
import {Plans, Plan} from './plans-mock';
import {User} from '../../classes/users';

let template = require('./views/plans.html');
let style = require('!!raw!sass!./views/plans.scss');

@Component({
  selector: 'plans',
  template: template,
  styles: [style]
})
export class PlansComponent implements OnInit {
  
  private plans:Array<Plan>;
  private user:User;
  constructor(private router: Router, private queueService:QueueService) {
    this.plans = Plans;
  }
  
  public ngOnInit() {
    this.user = this.queueService.getUser();
  }
  
  private selectPlan(plan:Plan) {
    this.queueService.setNewPlan(plan);
  }
}
