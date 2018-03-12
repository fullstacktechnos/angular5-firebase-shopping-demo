import { Product } from '../models/products';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .map(cart => cart ? new ShoppingCart(cart['items'])
                          : new ShoppingCart({}));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();

    const item = this.getItem(cartId, product.key);
    item.snapshotChanges().take(1).subscribe((tmpItem: any) => {
      const quantity = ((tmpItem.payload.val()) ? tmpItem.payload.val().quantity : 0 ) + change;
      if (quantity === 0) {
        item.remove();
      } else {
        item.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }

}
