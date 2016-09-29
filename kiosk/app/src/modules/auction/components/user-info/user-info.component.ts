import {Component} from '@angular/core';

let style = require('!!raw!sass!./views/user-info.scss');
let template = require('./views/user-info.html');

@Component({
  selector: 'user-info',
  template: template,
  styles: [style]
})
export class UserInfoComponent {


  constructor() {
  }

}
