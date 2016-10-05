import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QueueService} from '../../services/queue.service';
import {User} from '../../classes/users';
import {queue} from 'rxjs/scheduler/queue';
import {Plan} from '../plans/plans-mock';

let template = require('./views/review.html');
let style = require('!!raw!sass!./views/review.scss');

@Component({
  selector: 'review',
  template: template,
  styles: [style]
})
export class ReviewComponent implements OnInit {
  
  private previousPlan:Plan;
  private newPlan:Plan;
  constructor(private router: Router, private queueService:QueueService) {
  }
  
  public ngOnInit() {
    this.previousPlan = this.queueService.getPreviousPlan();
    this.newPlan = this.queueService.getNewPlan();
  }
  
}
