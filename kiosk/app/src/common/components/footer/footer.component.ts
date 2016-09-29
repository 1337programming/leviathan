import {Component, ChangeDetectionStrategy} from '@angular/core';
let style = require('!!raw!sass!./views/footer.scss');

@Component({
  selector: 'footer-bar',
  template: require('./views/footer.html'),
  styles: [style],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FooterComponent {
  constructor() {
  }
  
}
