import {Component, ViewChild} from '@angular/core';
import {Message} from 'primeng/primeng'
import {Fireworks} from '../fireworks/fireworks.component';

let template = require('./views/visit-options.html');
let style = require('!!raw!sass!./views/visit-options.scss');

@Component({
  selector: 'vist-options',
  template: template,
  styles: [style]
})
export class VisitOptionsComponent {
  
  @ViewChild(Fireworks) fireworks: Fireworks;
  
  private msgs: Array<Message>;
  private hideCanvas: boolean;
  
  constructor() {
    this.msgs = [];
    this.hideCanvas = true;
  }
  
  private onDisabled(item: string) {
    this.msgs.push({severity: 'warn', summary: 'Flow is not available', detail: `Action '${item}' is not 
    available at this time`});
  }
  
  private onClickOther() {
    if (this.hideCanvas) {
      this.msgs.push({severity: 'error', summary: 'Oops that doesn\'t work', detail: `¯\\_(ツ)_/¯`});
      this.hideCanvas = false;
      this.fireworks.run();
      setTimeout(() => {
        this.hideCanvas = true;
      }, 10000);
    }
  }
  
}
