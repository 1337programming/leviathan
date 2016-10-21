import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QueueService } from '../../services/queue.service';


let template = require('./views/queue-dashboard.html');
let style = require('!!raw!sass!./views/queue-dashboard.scss');

@Component({
  selector: 'queue-dashboard',
  template: template,
  styles: [style]
})
export class QueueDashboardComponent implements OnInit {

  @Input()
  private user: any;

  private users: Array<any>;
  constructor(private router: Router, private queueService: QueueService) {
    this.users = [];
  }

  public ngOnInit() {
    this.queueService.getQueue().subscribe(
      (queue) => {
        for (let key in queue) {
          if (queue.hasOwnProperty(key)) {
            console.log('user: ' + queue[key]);
            this.users.push(queue[key]);
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }
  public checkCurrentUser(checkingUser: any) {
    if (this.user.email === checkingUser.email) {
      return true;
    } else {
      return false;
    }
  }
}
