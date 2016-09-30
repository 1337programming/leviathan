import {Component} from '@angular/core';
import {Message} from 'primeng/primeng';

let style = require('!!raw!sass!./views/account.scss');
let template = require('./views/account.html');

@Component({
  selector: 'account',
  template: template,
  styles: [style]
})
export class AccountComponent {
  
  private msgs: Array<Message>;
  
  constructor() {
    this.msgs = [];
  }
  
  private onDisabled(item: string) {
    this.msgs.push({severity: 'warn', summary: 'Flow is not available', detail: `Action '${item}' is not 
    available at this time`});
  }
  
}
