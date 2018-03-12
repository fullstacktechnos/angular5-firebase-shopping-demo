import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable} from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
      this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if (result.user) {
          const user = result.user;
          console.log(user);
          this.userService.save(user);
          this.router.navigateByUrl(returnUrl);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
