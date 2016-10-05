import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'app/src/common/services/auth.service';

let template = require('./views/home.html');
let stylesheet = require('!!raw!sass!./views/home.scss');

@Component({
  selector: 'home',
  template: template,
  styles: [stylesheet],
})
export class HomeComponent implements OnInit {
  
  private enter: boolean;
  
  constructor(private router: Router, private authService: AuthService) {
    this.enter = false;
  }
  
  public ngOnInit() {
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
