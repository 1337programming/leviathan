import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../common/services/auth.service';

let template = require('./views/queue.html');
let style = require('!!raw!sass!./views/queue.scss');

@Component({
  selector: 'queue',
  template: template,
  styles: [style]
})
export class QueueComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  public ngOnInit() {
  }

  private cancel() {

  }

  private exit() {
    this.authService.deleteToken();
    this.router.navigate(['/home']);
  }

}
