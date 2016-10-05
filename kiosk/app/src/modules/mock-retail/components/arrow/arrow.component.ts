import {Component, OnInit, Input} from '@angular/core';

let template = require('./views/arrow.html');
let style = require('!!raw!sass!./views/arrow.scss');

@Component({
  selector: 'arrow',
  template: template,
  styles: [style]
})
export class Arrow implements OnInit {
  
  @Input() protected name: string;
  @Input() protected selected: string;
  @Input() protected index: number;
  
  constructor() {
  }
  
  public ngOnInit() {
  }
  
}
