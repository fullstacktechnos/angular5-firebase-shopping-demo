import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router,
    private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userService.get(user.uid).valueChanges())
      .map(appUser => appUser.isAdmin);
  }
}
