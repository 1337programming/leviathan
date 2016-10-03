import {Component, OnInit, Output, EventEmitter} from '@angular/core';

let style = require('!!raw!sass!./views/funds.scss');
let template = require('./views/funds.html');

@Component({
  selector: 'funds',
  template: template,
  styles: [style]
})
export class FundsComponent implements OnInit {
  
  private loading: boolean;
  @Output() private loaded = new EventEmitter();
  
  constructor() {
    this.loading = true;
  }
  
  public ngOnInit() {
    // Mock Payment retrieval
    setTimeout(() => {
      this.loading = false;
      this.loaded.emit(true);
    }, 3000);
  }
  
  
}
