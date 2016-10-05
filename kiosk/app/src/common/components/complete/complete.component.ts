import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

let template = require('./views/complete.html');
let style = require('!!raw!sass!./views/complete.scss');

@Component({
  selector: 'complete',
  template: template,
  styles: [style]
})
export class CompleteComponent implements OnInit {
  
  private processing: boolean;
  private message: string;
  private yahoo:boolean;
  
  constructor(private router: Router, private authService:AuthService) {
    this.yahoo = false;
  }
  
  public ngOnInit() {
    this.processing = false;
    this.message = 'Anything else we can do for you?';
  }
  
  private continue() {
    if (!this.processing) {
      this.processing = true;
      this.message = 'Bringing you back to main menu...';
      this.yahoo = true;
      setTimeout(()=> {
        this.router.navigate(['/visit-options']);
      }, 1500);
    }
  }
  
  private exit() {
    if (!this.processing) {
      this.processing = true;
      this.message = 'See us again soon!';
      this.authService.deleteToken();
      setTimeout(()=> {
        this.router.navigate(['/home']);
      }, 1500);
    }
  }
}
