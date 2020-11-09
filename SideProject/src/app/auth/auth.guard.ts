import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // checks if route can be visited or not
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      alert('Please login to proceed!');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
