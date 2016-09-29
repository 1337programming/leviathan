import {Component, OnInit} from '@angular/core';
import {MenuItem, Message} from 'primeng/primeng';

let style = require('!!raw!sass!./views/receipt.scss');
let template = require('./views/receipt.html');

@Component({
  selector: 'receipt',
  template: template,
  styles: [style]
})
export class ReceiptComponent implements OnInit {

  private loading:boolean;

  constructor() {
    this.loading = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

}
