import {Component} from '@angular/core';

let style = require('!!raw!sass!./views/about-plan.scss');
let template = require('./views/about-plan.html');

@Component({
  selector: 'about-plan',
  template: template,
  styles: [style]
})
export class AboutPlanComponent {
  
  constructor() {
  }
  
}
