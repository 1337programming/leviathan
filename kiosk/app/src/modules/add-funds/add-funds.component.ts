import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpComponent } from '../../common/components/help/help.component';

import { FundsService } from './services/funds.service';

let style = require('!!raw!sass!./views/add-funds.scss');
let template = require('./views/add-funds.html');

@Component({
  selector: 'add-funds',
  template: template,
  styles: [style]
})
export class AddFundsComponent implements OnInit {

  @ViewChild(HelpComponent) private help: HelpComponent;
  private loaded: boolean;

  private user: any;

  constructor(private router: Router, private _fundService: FundsService) {
    this.loaded = false;
  }

  public ngOnInit() {
    this._fundService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      });
  }

  private callHelp(): void {
    this.help.showDialog();
  }

  private fundsLoaded(val: boolean) {
    this.loaded = true;
  }
}
