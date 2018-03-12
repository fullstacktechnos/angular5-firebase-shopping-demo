import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  async placeOrder(order) {
    // To-do: Better to use transaction so that if order is not stored
    // then we should not clear the cart
   const result = await this.db.list('/orders').push(order);
   this.shoppingCartService.clearCart();
   return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
