import {Component} from '@angular/core';

let template = require('./views/scanner.html');
let style = require('!!raw!sass!./views/scanner.scss');

@Component({
  selector: 'scanner',
  template: template,
  styles: [style]
})
export class ScannerComponent {
  
  constructor() {
    
  }
  
}
