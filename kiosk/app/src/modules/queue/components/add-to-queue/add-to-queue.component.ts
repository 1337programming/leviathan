import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../common/services/auth.service';
import { QueueService } from '../../services/queue.service';

let template = require('./views/queue.html');
let style = require('!!raw!sass!./views/queue.scss');

@Component({
  selector: 'queue',
  template: template,
  styles: [style]
})
export class QueueComponent implements OnInit {

  private user: any;
  private userPosition: any;
  private queue: any;

  constructor(private router: Router, private authService: AuthService, private queueService: QueueService) {

  }

  public ngOnInit() {
    this.queueService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      });
    this.queueService.getPosition().subscribe(
      (response) => {
        this.userPosition = response.position;
      },
      (error) => {
        console.log(error);
      });
  }

  private exit() {
    this.authService.deleteToken();
    this.router.navigate(['/home']);
  }

  private findUserPosition() {

  }

}
