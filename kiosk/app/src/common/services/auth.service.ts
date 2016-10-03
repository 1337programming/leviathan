import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  
  private flow: string;
  private token: string;
  
  constructor() {
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
  
}
