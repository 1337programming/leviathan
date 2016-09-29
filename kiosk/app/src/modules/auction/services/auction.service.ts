import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';

@Injectable()
export class AuctionService {
  
  constructor(private http: Http) {
  }
  
}
