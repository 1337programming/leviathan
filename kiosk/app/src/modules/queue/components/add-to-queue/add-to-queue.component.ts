import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

let template = require('./views/queue.html');
let style = require('!!raw!sass!./views/queue.scss');

@Component({
  selector: 'queue',
  template: template,
  styles: [style]
})
export class QueueComponent implements OnInit {
  
  constructor(private router:Router) {
  }
  
  public ngOnInit() {
  }
  
}
