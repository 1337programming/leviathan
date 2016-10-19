import { Component, ViewChild, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { HelpComponent } from '../../common/components/help/help.component';
import { AccountService } from './services/account.service';

let style = require('!!raw!sass!./views/account.scss');
let template = require('./views/account.html');

@Component({
  selector: 'account',
  template: template,
  styles: [style]
})
export class AccountComponent implements OnInit {

  private user: any;

  @ViewChild(HelpComponent) private help: HelpComponent;
  private msgs: Array<Message>;

  constructor(private _accountService: AccountService) {
    this.msgs = [];
  }

  public ngOnInit() {
    this._accountService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
        // TODO: Show error if get user service fails
      });
  }

  private callHelp(): void {
    this.help.showDialog();
  }

}
