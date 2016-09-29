import {Component} from '@angular/core';
import 'rxjs/add/operator/bufferTime';

let style = require('!!raw!sass!./views/customer.scss');
let template = require('./views/customer.html');

@Component({
  selector: 'customer',
  template: template,
  styles: [style]
})
export class CustomerComponent {

  private showdialog:boolean;

  constructor() {
    this.showdialog = false;
  }

  private showDialog() {
    this.showdialog = true;
  }

}
