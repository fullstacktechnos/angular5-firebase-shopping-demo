import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './products';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      if (productId) {
        const item = itemsMap[productId];
        this.items.push(new ShoppingCartItem({ key: productId, ...item }));
      }
    }
  }

  getQuantity(product: Product) {
    const item: ShoppingCartItem = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      if (productId) {
        sum += this.items[productId].totalPrice;
      }
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      if (productId) {
        count += this.itemsMap[productId].quantity;
      }
    }
    return count;
  }
}
