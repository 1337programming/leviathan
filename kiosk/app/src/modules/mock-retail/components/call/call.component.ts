import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {QueueService} from '../../services/queue.service';

let template = require('./views/call.html');
let style = require('!!raw!sass!./views/call.scss');

@Component({
  selector: 'call',
  template: template,
  styles: [style]
})
export class CallComponent implements OnInit {
  
  @Input() protected display:boolean;
  @Output() protected close:EventEmitter<{}>;
  
  constructor(private router: Router, private queueService:QueueService) {
    this.close = new EventEmitter();
  }
  
  public ngOnInit() {
  }
  
  private closeModal() {
    this.close.emit({value: true});
  }
  
}
