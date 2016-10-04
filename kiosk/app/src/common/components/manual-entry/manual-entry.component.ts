import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

let template = require('./views/manual-entry.html');
let style = require('!!raw!sass!./views/manual-entry.scss');

@Component({
  selector: 'manual-entry',
  template: template,
  styles: [style]
})
export class ManualEntryComponent implements OnInit {

  email: string;
  password: string
  failed_login: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  public ngOnInit() {
  }

  private signIn() {

    this._authService.authenticate(this.email, this.password).then(
      (token) => {
        if (token) {
          console.log(token);
          this._authService.setToken(token);
          this._router.navigate(['account']);
        }
      },
      (error) => {

      });
  }

}
