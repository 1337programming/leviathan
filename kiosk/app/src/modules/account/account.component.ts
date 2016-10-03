import {Component, ViewChild} from '@angular/core';
import {Message} from 'primeng/primeng';
import {HelpComponent} from '../../common/components/help/help.component';

let style = require('!!raw!sass!./views/account.scss');
let template = require('./views/account.html');

@Component({
  selector: 'account',
  template: template,
  styles: [style]
})
export class AccountComponent {
  
  @ViewChild(HelpComponent) private help: HelpComponent;
  private msgs: Array<Message>;
  
  constructor() {
    this.msgs = [];
  }
  
  private callHelp(): void {
    this.help.showDialog();
  }
  
}
