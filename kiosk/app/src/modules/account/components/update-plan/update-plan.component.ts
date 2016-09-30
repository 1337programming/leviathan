import {Component} from '@angular/core';

let style = require('!!raw!sass!./views/update-plan.scss');
let template = require('./views/update-plan.html');

@Component({
  selector: 'update-plan',
  template: template,
  styles: [style]
})
export class UpdatePlanComponent {
  
  constructor() {
  }
  
}
