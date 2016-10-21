import { Component, OnInit } from '@angular/core';
import { FundsService } from '../../services/funds.service';

let style = require('!!raw!sass!./views/confirmation.scss');
let template = require('./views/confirmation.html');

@Component({
  selector: 'confirmation',
  template: template,
  styles: [style]
})
export class ConfirmationComponent implements OnInit {

  private user: any;

  constructor(private _fundService: FundsService) {
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

}
