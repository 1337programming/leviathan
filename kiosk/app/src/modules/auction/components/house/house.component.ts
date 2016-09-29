import {Component} from '@angular/core';
import 'rxjs/add/operator/bufferTime';

let style = require('!!raw!sass!./views/house.scss');
let template = require('./views/house.html');

@Component({
  selector: 'house',
  template: template,
  styles: [style]
})
export class HouseComponent {
  
  private showdialog:boolean;
  
  constructor() {
    this.showdialog = false;
  }
  
  private showDialog() {
    this.showdialog = true;
  }
}
