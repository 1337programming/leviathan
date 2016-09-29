import {Component} from '@angular/core';

let template = require('./views/visit-options.html');
let style = require('!!raw!sass!./views/visit-options.scss');

@Component({
  selector: 'scan',
  template: template,
  styles: [style]
})
export class VisitComponent {
  
  constructor() {
    
  }
  
}
