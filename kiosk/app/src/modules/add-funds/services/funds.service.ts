import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../../common/services/auth.service';
import { Observable } from 'rxjs';

const ACCOUNT_URL: string = 'http://localhost:8081/user/';

@Injectable()
export class FundsService {
    constructor(private _authService: AuthService, private _http: Http) { }

    public getUser() {
        let userId = this._authService.getUserFromToken();
        return this.getUserDetails(userId);
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

    // public depositFunds(userId: string, amount: number) {

    // }

}
