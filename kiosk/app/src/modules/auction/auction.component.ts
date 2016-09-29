import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem, Message} from 'primeng/primeng';

let style = require('!!raw!sass!./views/auction.scss');
let template = require('./views/auction.html');

@Component({
  selector: 'auction',
  template: template,
  styles: [style]
})
export class AuctionComponent implements OnInit {
  
  private states: MenuItem[];
  private activeState: MenuItem;
  private options: MenuItem[];
  private msgs: Message[];

  private showConfirm:boolean;
  private showHouse:boolean;
  private showCustomer:boolean;
  
  constructor(private router: Router) {
    this.msgs = [];
    // @TODO use router outlet aux instead of manually hide/show
    this.showHouse = false;
    this.showCustomer = true;
    this.showConfirm = false;
  }
  
  ngOnInit() {
    this.states = [
      {label: 'Customer', icon: 'fa-bar-chart', command: () => {
        this.showHouse = false;
        this.showCustomer = true;
      }},
      {label: 'House', icon: 'fa-calendar', command: () => {
        this.showCustomer = false;
        this.showHouse = true;
      }}
    ];
    this.activeState = this.states[0];
    
    this.options = [
      {
        label: 'Update', icon: 'fa-refresh', command: () => {
        this.update();
      }
      },
      {
        label: 'Delete', icon: 'fa-close', command: () => {
        this.delete();
      }
      }
    ];
  }

  private save() {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Data Saved'});
    this.showConfirmDialog();
  }
  
  private update() {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Data Updated'});
  }
  
  private delete() {
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: 'Success', detail: 'Data Deleted'});
  }

  private continue() {
    this.router.navigate(['/auction/receipt']);
  }

  private showConfirmDialog() {
    this.showConfirm = true;
  }
  
  
}
