import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'app/src/common/services/auth.service';

let template = require('./views/manual-entry.html');
let style = require('!!raw!sass!./views/manual-entry.scss');

@Component({
  selector: 'manual-entry',
  template: template,
  styles: [style]
})
export class ManualEntryComponent implements OnInit {
  
  private email: string;
  private password: string;
  
  constructor(private authService: AuthService, private router: Router) {
  }
  
  public ngOnInit() {
  }
  
  private signIn() {
    
    this.authService.authenticate(this.email, this.password)
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
