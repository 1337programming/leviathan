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
  private modalWidth:number;
  constructor(private router: Router) {
    this.modalWidth = 600; // 600 px
    this.display = false;
  }
  
  public ngOnInit() {
  }
  
  public showDialog() {
    this.display = true;
  }
  
  private close() {
    let interval = setInterval(() => {
      this.modalWidth = this.modalWidth - (Math.floor(Math.random() * 15) + 15);
      if(this.modalWidth < 0) {
        clearInterval(interval);
        this.display = false;
        this.modalWidth = 600;
      }
    }, 20);
    //this.display = false;
  }
  
  private addToQueue(reason:string) {
    console.log('reason', reason);
    this.router.navigate(['/queue']);
  }
  
}
