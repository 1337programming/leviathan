import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../classes/users';
import {QueueService} from '../../services/queue.service';

let template = require('./views/queue.html');
let style = require('!!raw!sass!./views/queue.scss');

@Component({
  selector: 'queue',
  template: template,
  styles: [style]
})
export class QueueComponent implements OnInit {
  
  private users:Array<User>;
  
  constructor(private router: Router, private queueService:QueueService) {
  }
  
  public ngOnInit() {
    this.users = this.queueService.getQueue();
    this.deselectUsers();
    this.users[0].selected = true;
  }
  
  private selectUser(user:User) {
    if (user.selected) {
      this.queueService.setUser(user);
      this.router.navigate(['/retail/queue-select']);
    } else {
      this.deselectUsers();
      user.selected = true;
    }
  }
  
  private deselectUsers() {
    for (let i:number = 0; i < this.users.length; i++) {
      this.users[i].selected = false;
    }
  }
  
}
