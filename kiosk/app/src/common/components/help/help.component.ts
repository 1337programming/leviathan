import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

let template = require('./views/help.html');
let style = require('!!raw!sass!./views/help.scss');

@Component({
  selector: 'help',
  template: template,
  styles: [style]
})
export class ScannerComponent implements OnInit {
  
  constructor(private router:Router) {
  }
  
  public ngOnInit() {
  }
  
}
