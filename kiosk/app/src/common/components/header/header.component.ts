import {Component, ChangeDetectionStrategy} from '@angular/core';
let style = require('!!raw!sass!./views/header.scss');

@Component({
  selector: 'header-bar',
  template: require('./views/header.html'),
  styles: [style],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent {
  
  constructor() {
  }
  
}
