import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Observable } from 'rxjs';

import { FundsService } from '../../services/funds.service';

let style = require('!!raw!sass!./views/funds.scss');
let template = require('./views/funds.html');

@Component({
  selector: 'funds',
  template: template,
  styles: [style]
})
export class FundsComponent implements OnInit {

  private processingPayment: boolean;
  private addingFunds: boolean;
  private cashOption: boolean;

  private msgs: Array<Message>;

  @Input() private funds: number;
  @Output() private disable = new EventEmitter();

  constructor(private router: Router, private _fundsService: FundsService) {
    this.processingPayment = false;
    this.addingFunds = false;
    this.cashOption = false;
    this.msgs = [];
  }

  public ngOnInit() {
  }

  public addFunds() {
    this.addingFunds = true;
    this.disable.emit(true);
  }
  public stopAdding() {
    this.addingFunds = false;
    this.disable.emit(false);
  }

  public chooseCash() {
    this.cashOption = true;
  }
  public chooseCard() {
    this.cashOption = false;
  }
  public processPayment(form: any) {
    if (!form.valid) { // Dont process submit
      this.processingPayment = true;
      setTimeout(() => {
        // Call service to deposit funds
        this._fundsService.depositFunds(form.payment)
          .subscribe(
          (token) => {
            this.router.navigate(['add-funds/confirmation']);
          },
          (err) => {
            this.msgs.push({
              severity: 'error', summary: err
            });
            return Observable.of(err.message);
          });
      }, 2000);
    }
  }

}
