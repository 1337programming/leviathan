import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {AuthService} from './auth.service';
import {SETTINGS} from '../../core/settings';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  
  public canActivate(): boolean {
    if (this.authService.isLoggedIn() || SETTINGS.PROD === true) {
      console.log('Logged In');
      return true;
    } else {
      console.log('Not Logged In');
      this.router.navigate(['/identify/manual-entry']);
      return false;
    }
  }
}

