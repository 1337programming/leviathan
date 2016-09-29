import {Component} from '@angular/core';
let style = require('!!raw!sass!./views/confirmation.scss');
let template = require('./views/confirmation.html');

@Component({
  selector: 'confirmation',
  template: template,
  styles: [style]
})
export class ConfirmationComponent {
  
  constructor() {
  }
  
}
