import {Component} from '@angular/core';
import {Message} from 'primeng/primeng'

let template = require('./views/visit-options.html');
let style = require('!!raw!sass!./views/visit-options.scss');

@Component({
  selector: 'vist-options',
  template: template,
  styles: [style]
})
export class VisitOptionsComponent {
  
  private msgs: Array<Message>;
  
  constructor() {
    this.msgs = [];
  }
  
  private onDisabled(item: string) {
    this.msgs.push({severity: 'warn', summary: 'Flow is not available', detail: `Action '${item}' is not 
    available at this time`});
  }
  
}
