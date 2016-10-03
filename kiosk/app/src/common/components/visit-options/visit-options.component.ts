import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {Fireworks} from '../fireworks/fireworks.component';
import {AuthService} from '../../services/auth.service';
import {OPTIONS, Option} from './options';

let template = require('./views/visit-options.html');
let style = require('!!raw!sass!./views/visit-options.scss');

@Component({
  selector: 'visit-options',
  template: template,
  styles: [style]
})
export class VisitOptionsComponent {
  
  @ViewChild(Fireworks) private fireworks: Fireworks;
  
  private msgs: Array<Message>;
  private hideCanvas: boolean;
  private options: Array<Option>;
  
  constructor(private authService: AuthService, private router: Router) {
    this.options = OPTIONS;
    this.msgs = [];
    this.hideCanvas = true;
  }
  
  private selectOption(option: Option): void {
    if (option.disabled) {
      this.msgs.push({
        severity: 'warn', summary: 'Flow is not available', detail: `Action '${option.title}' is not 
    available at this time`
      });
    } else {
      this.authService.setFlow(option.route);
      this.router.navigate([`/${option.route}`]);
    }
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
  
  private toggleCanvas() {
    this.hideCanvas = !this.hideCanvas;
  }
  
}
