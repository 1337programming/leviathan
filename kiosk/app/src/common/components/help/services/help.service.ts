import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthService} from 'app/src/common/services/auth.service';
import {Observable} from 'rxjs';

const QUEUE_URL: string = 'http://localhost:8081/queue';

@Injectable()
export class HelpService {
  constructor(private _authService: AuthService, private _http: Http) {
    
  }
  
  public addUser(reason: string) {
    let user_id = this._authService.getUserFromToken();
    let flow = this._authService.getFlow();
    return this.addUserToQueue(user_id, flow, reason);
  }
  
  private addUserToQueue(user_id: string, flow: string, reason: string): any {
    console.log('Adding user: ' + user_id + ' to queue');
    let body = JSON.stringify({'user_id': user_id, 'reason': reason, 'flow': flow});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    
    return this._http.post(`${QUEUE_URL}/push`, body, options)
      .map(this.handleAddToQueueResponse)
      .catch(this.handleAddToQueueError);
  }
  
  private handleAddToQueueResponse(res: Response): number {
    return res.status || 999;
  }
  
  private handleAddToQueueError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  
}
