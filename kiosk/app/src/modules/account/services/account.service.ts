import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthService } from '../../../common/services/auth.service';
import { Observable } from 'rxjs/RX';

const ACCOUNT_URL: string = 'http://localhost:8081/user/';

@Injectable()
export class AccountService {
  constructor(private _authService: AuthService ,private _http: Http) {

  }
  getUser(){
      let user_id = this._authService.getUserFromToken();
      return this.getUserDetails(user_id);
  }

private getUserDetails(user_id: string): any {

    return this._http.get(ACCOUNT_URL+user_id)
      .map(this.handleGetUserResponse)
      .catch(this.handleGetUserError);
  }

  private handleGetUserResponse(res: Response): any {
    let body = res.json();
    return body || { };
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
