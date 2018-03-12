import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  isAdmin: boolean;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.user$
    .switchMap(user => {
        return user ? this.userService.get(user.uid).valueChanges()
                      : Observable.of<AppUser>(null);
    })
    .subscribe(appUser => {
      this.isAdmin = appUser ? appUser.isAdmin : false;
    });

   this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
