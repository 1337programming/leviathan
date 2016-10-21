import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from 'app/src/common/services/auth.service';
import { Observable } from 'rxjs';

const QUEUE_URL: string = 'http://localhost:8081/queue';

@Injectable()
export class HelpService {
    constructor(private _authService: AuthService, private _http: Http) { }

    public getQueue() {
        return this._http.get(QUEUE_URL)
            .map(this.handleWaitTimeResponse)
            .catch(this.handleWaitTimeError);
    }

    public addUser(reason: string) {
        let userId = this._authService.getUserFromToken();
        let flow = this._authService.getFlow();
        return this.addUserToQueue(userId, flow, reason);
    }

    private handleWaitTimeResponse(res: Response): any {
        let body = res.json();
        return body || {};
    }

    private handleWaitTimeError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        let errorDisplay = 'Oops! Server Error';
        return Observable.throw(errorDisplay);
    }

    private addUserToQueue(userId: string, flow: string, reason: string): any {
        console.log('Adding user: ' + userId + ' to queue');
        let body = JSON.stringify({ 'reason': reason, 'flow': flow });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(QUEUE_URL + '/push/' + userId, body, options)
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

        let errorDisplay, status = error.status ? error.status : 999;
        if (status === 400) {
            errorDisplay = 'Looks like you are already in Queue';
        } else {
            errorDisplay = 'Oops! Server Error';
        }
        return Observable.throw(errorDisplay);
    }

}
