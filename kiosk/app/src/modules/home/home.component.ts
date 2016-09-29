import {Component} from '@angular/core';
import 'rxjs/add/operator/bufferTime';

let style = require('!!raw!sass!./views/home.scss');
let template = require('./views/home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [style]
})
export class HomeComponent {
  
  constructor() {
  }
}
