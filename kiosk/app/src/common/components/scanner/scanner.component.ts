import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'app/src/common/services/auth.service';

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
    this.authService.authenticate('test.test@1337programming.com', 'password')
      .subscribe(
        (token) => {
          if (token) {
            this.authService.setToken(token);
            this.router.navigate([`/${this.authService.getFlow()}`]);
          } else {
            // TODO: Show invalid login when failed
          }
        },
        (err) => {
          console.log(err);
          // TODO: Show error if loging service fails
        });
  }
  
}
