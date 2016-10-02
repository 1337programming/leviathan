import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

let template = require('./views/manual-entry.html');
let style = require('!!raw!sass!./views/manual-entry.scss');

@Component({
  selector: 'manual-entry',
  template: template,
  styles: [style]
})
export class ManualEntryComponent implements OnInit {
  
  constructor(private authService:AuthService) {
  }
  
  ngOnInit() {
  }
  
  private signIn() {
    
  }
  
}
