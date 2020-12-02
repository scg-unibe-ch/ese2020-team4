import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

/**
 * Guard for Admin/User pages
 */
@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate{


   constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (expectedRole === 'admin') {
      if (!(localStorage.getItem('roleId') === '1')) {
        this.router.navigate(['/main']);
        return false;
      }
      return true;
    }



    if (!((localStorage.getItem('roleId') === '2') || (localStorage.getItem('roleId') === '1') )) {
        this.router.navigate(['/main']);
        return false;
    }
    return true;

  }
}
