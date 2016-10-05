import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import { Observable } from 'rxjs/RX'


import {AuthService} from '../../services/auth.service';

let template = require('./views/manual-entry.html');
let style = require('!!raw!sass!./views/manual-entry.scss');

@Component({
  selector: 'manual-entry',
  template: template,
  styles: [style]
})
export class ManualEntryComponent implements OnInit {

  private email: string;
  private password: string;
  private msgs: Array<Message>;

  constructor(private _authService: AuthService, private _router: Router) {
    this.msgs = [];
  }

  public ngOnInit() {
  }

  private signIn() {

    this._authService.authenticate(this.email, this.password)
      .subscribe(
      (token) => {
        this._authService.setToken(token);
        this._router.navigate(['account']);
      },
      (err) => {
        this.msgs.push({
          severity: 'error', summary: err
        });
        return Observable.of(err.message);
      });
  }

}
