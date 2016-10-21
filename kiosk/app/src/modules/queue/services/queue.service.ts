import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from 'app/src/common/services/auth.service';
import { Observable } from 'rxjs';

const QUEUE_URL: string = 'http://localhost:8081/queue';
const ACCOUNT_URL: string = 'http://localhost:8081/user/';

@Injectable()
export class QueueService {

  constructor(private _authService: AuthService, private _http: Http) { }

  public getQueue() {
    return this._http.get(QUEUE_URL)
      .map(this.handleGetQueueResponse)
      .catch(this.handleGetQueueError);
  }
  public getUser() {
    let userId = this._authService.getUserFromToken();
    return this.getUserDetails(userId);
  }
  public getPosition() {
    let userId = this._authService.getUserFromToken();
    return this._http.get(QUEUE_URL + '/position/' + userId)
      .map((response: Response) => {
        let body = response.json();
        return body || {};
      })
      .catch((error: any) => {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
      });
  }
  private handleGetQueueResponse(res: Response): any {
    let body = res.json();
    return body || {};
  }

  private handleGetQueueError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead

    let errorDisplay = 'Oops! Server Error';
    return Observable.throw(errorDisplay);
  }

  private getUserDetails(userId: string): any {

    return this._http.get(ACCOUNT_URL + userId)
      .map(this.handleGetUserResponse)
      .catch(this.handleGetUserError);
  }

  private handleGetUserResponse(res: Response): any {
    let body = res.json();
    return body || {};
  }

  private handleGetUserError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
