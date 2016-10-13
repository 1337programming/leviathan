import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'app/src/common/services/auth.service';
import {Message} from 'primeng/primeng';
import { Observable } from 'rxjs'

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
  private msgs: Array<Message>;

  constructor(private authService: AuthService, private router: Router) {
    this.msgs = [];
  }
  
  public ngOnInit() {
  }
  
  private signIn() {
    
    this.authService.authenticate(this.email, this.password)
      .subscribe(
      (token) => {
        this.authService.setToken(token);
        this.router.navigate([`${this.authService.getFlow()}`]);
      },
      (err) => {
        this.msgs.push({
          severity: 'error', summary: err
        });
        return Observable.of(err.message);
      });
  }
  
}
