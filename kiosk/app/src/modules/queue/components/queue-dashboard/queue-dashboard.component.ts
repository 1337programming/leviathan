import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

let template = require('./views/queue-dashboard.html');
let style = require('!!raw!sass!./views/queue-dashboard.scss');

@Component({
  selector: 'queue-dashboard',
  template: template,
  styles: [style]
})
export class QueueDashboardComponent implements OnInit {
  
  constructor(private router:Router) {
  }
  
  public ngOnInit() {
  }
  
}
