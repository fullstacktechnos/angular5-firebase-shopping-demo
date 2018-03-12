import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.map(user => {
      if (user) {
        return true;
      }

      this.router.navigate(['login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    });
  }

}
