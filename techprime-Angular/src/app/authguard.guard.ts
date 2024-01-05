

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authguardGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor( private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }



  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (localStorage.getItem('IsAuthenticated')=="true") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}