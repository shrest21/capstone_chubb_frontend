import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: { productId: number; quantity: number }[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }
  addToCart(productId: number) {
    const existingItem = this.cart.find(
      item => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  getCart() {
    return this.cart;
  }
}
