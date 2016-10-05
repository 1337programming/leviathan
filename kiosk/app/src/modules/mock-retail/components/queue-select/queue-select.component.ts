import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QueueService} from '../../services/queue.service';
import {User} from '../../classes/users';
import {queue} from 'rxjs/scheduler/queue';

let template = require('./views/queue-select.html');
let style = require('!!raw!sass!./views/queue-select.scss');

@Component({
  selector: 'queue-select',
  template: template,
  styles: [style]
})
export class QueueSelect implements OnInit {
  
  private user:User;
  private display:boolean;
  constructor(private router: Router, private queueService:QueueService) {
    this.display = false;
  }
  
  public ngOnInit() {
    this.user = this.queueService.getUser();
  }
  
  private onModalClose(val) {
    this.display = false;
    
  }
  
  private connectCall() {
    this.display = true;
    setTimeout(() => {
      this.router.navigate(['/retail/plans'])
    }, 8000);
  }
  
}
