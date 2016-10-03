import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

let template = require('./views/complete.html');
let style = require('!!raw!sass!./views/complete.scss');

@Component({
  selector: 'complete',
  template: template,
  styles: [style]
})
export class CompleteComponent implements OnInit {
  
  constructor(private router: Router) {
  }
  
}
