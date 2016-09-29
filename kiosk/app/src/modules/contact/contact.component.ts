import {Component, ChangeDetectionStrategy} from '@angular/core';
let style = require('!!raw!sass!./views/contact.scss');
let template = require('./views/contact.html');

@Component({
  selector: 'contact',
  template: template,
  styles: [style]
})
export class ContactComponent {

  constructor() {
  }

}
