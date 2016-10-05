import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/RX';

const AUTH_URL: string = 'http://localhost:8081/auth/login';

@Injectable()
export class AuthService {

  private flow: string;
  private token: any;

  constructor(private _http: Http) {
    this.flow = 'home';
  }

  public getToken(): string {
    if (this.isLoggedIn()) {
      return this.token;
    }
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public deleteToken(): void {
    this.token = null;
  }

  public getFlow(): string {
    return this.flow;
  }

  public setFlow(flow: string): void {
    this.flow = flow;
  }

  public getUserFromToken(): any {
    if (this.token) {
      try {
        let token_obj = this.token;
        return token_obj.user_id;
      }
      catch (error) {
        console.log('Token parse error: ' + error);
        return null
      }
    }
    return null;
  }

  public isLoggedIn(): boolean {
    return this.token ? true : false;
  }

  public authenticate(email: string, password: string): any {
    console.log('Authenticating: ' + email + ' , ' + password);

    let body = JSON.stringify({ 'email': email, 'password': password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(AUTH_URL, body, options)
      .map(this.handleLoginResponse)
      .catch(this.handleLoginError);
  }

  private handleLoginResponse(res: Response): boolean {
    let status = res.status;
    if (status !== 200) {
      return null;
    } else {
      let token = res.json();
      return token;
    }
  }

  private handleLoginError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';


    console.error(errMsg); // log to console instead

    var errorDisplay, status = error.status ? error.status : 999;
    if (status === 400) {
      errorDisplay = 'Invalid submission for Login'
    } else if (status === 403) {
      errorDisplay = 'Invalid email or password';
    } else if (status === 404) {
      errorDisplay = 'Email address not registered';
    } else {
      errorDisplay = 'Oops! Server Error';
    }

    return Observable.throw(errorDisplay);
  }
}
