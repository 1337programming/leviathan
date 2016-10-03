import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

let template = require('./views/scanner.html');
let style = require('!!raw!sass!./views/scanner.scss');

@Component({
  selector: 'scanner',
  template: template,
  styles: [style]
})
export class ScannerComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) {
  }
  
  public ngOnInit() {
  }
  
  private signIn() {
    // @TODO mock token
    this.authService.setToken('=Dkj3@33');
    this.router.navigate([`/${this.authService.getFlow()}`]);
  }
  
}
