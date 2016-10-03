import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

let template = require('./views/help.html');
let style = require('!!raw!sass!./views/help.scss');

@Component({
  selector: 'help',
  template: template,
  styles: [style]
})
export class HelpComponent implements OnInit {
  
  private display: boolean;
  constructor(private router: Router) {
    this.display = false;
  }
  
  public ngOnInit() {
  }
  
  public showDialog() {
    this.display = true;
  }
  
  private close() {
    this.display = false;
  }
  
  private addToQueue(reason:string) {
    console.log('reason', reason);
    this.router.navigate(['/queue']);
  }
  
}
