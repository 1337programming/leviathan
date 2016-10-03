import {Component} from '@angular/core';

let style = require('!!raw!sass!./views/404.scss');
let template = require('./views/404.html');

@Component({
  selector: 'not-found',
  template: template,
  styles: [style]
})
export class NotFoundComponent {
  constructor() {
  }
  
}
