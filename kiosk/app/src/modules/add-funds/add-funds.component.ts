import {Component} from '@angular/core';
let style = require('!!raw!sass!./views/account.scss');
let template = require('./views/account.html');

@Component({
  selector: 'add-funds',
  template: template,
  styles: [style]
})
export class AddFundsComponent {
  
  constructor() {
  }
  
}
