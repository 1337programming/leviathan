import {Component} from '@angular/core';
import {Router} from '@angular/router';

let template = require('./views/home.html');
let stylesheet = require('!!raw!sass!./views/home.scss');

@Component({
  selector: 'home',
  template: template,
  styles: [stylesheet],
})
export class HomeComponent {
  
  private enter: boolean;
  
  constructor(private router:Router) {
    this.enter = false;
  }
  
  private enterKiosk() {
    if (!this.enter) {
      this.enter = true;
      setTimeout(() => {
        this.enter = false;
        this.router.navigate(['/visit-options']);
      }, 800);
    }
  }
  
}
