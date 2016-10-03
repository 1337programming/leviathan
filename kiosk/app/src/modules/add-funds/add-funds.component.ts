import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelpComponent} from '../../common/components/help/help.component';

let style = require('!!raw!sass!./views/add-funds.scss');
let template = require('./views/add-funds.html');

@Component({
  selector: 'add-funds',
  template: template,
  styles: [style]
})
export class AddFundsComponent implements OnInit {
  
  @ViewChild(HelpComponent) private help: HelpComponent;
  
  constructor(private router: Router) {
  }
  
  public ngOnInit() {
  }
  
  private callHelp(): void {
    this.help.showDialog();
  }
  
}
