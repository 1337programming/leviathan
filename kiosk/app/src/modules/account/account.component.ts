import {Component} from '@angular/core';
let style = require('!!raw!sass!./views/account.scss');
let template = require('./views/account.html');

@Component({
  selector: 'account',
  template: template,
  styles: [style]
})
export class AccountComponent {
  
  constructor() {
  }
  
}
