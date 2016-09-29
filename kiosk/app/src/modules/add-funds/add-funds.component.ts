import {Component} from '@angular/core';
let style = require('!!raw!sass!./views/add-funds.scss');
let template = require('./views/add-funds.html');

@Component({
  selector: 'add-funds',
  template: template,
  styles: [style]
})
export class AddFundsComponent {
  
  constructor() {
  }
  
}
