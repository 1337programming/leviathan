import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/toPromise';

const AUTH_URL: string = 'http://localhost:8081/auth/login';

@Injectable()
export class AuthService {

  private flow: string;
  private token: string;

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
    return Observable.throw(errMsg);
  }
}
