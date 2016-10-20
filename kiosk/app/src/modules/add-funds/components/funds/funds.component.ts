import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Input() private funds: number;

  constructor() {
    this.processingPayment = false;
    this.addingFunds = false;
    this.cashOption = false;
  }

  public ngOnInit() {
  }

  public addFunds() {
    this.addingFunds = true;
  }
  public stopAdding() {
    this.addingFunds = false;
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
        this.processingPayment = false;
        this.stopAdding();
      }, 2000);
    }
  }

}
