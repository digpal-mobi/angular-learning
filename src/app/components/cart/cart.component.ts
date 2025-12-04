import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import * as CartActions from '../../store/cart/cart.actions';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]> = this.store.select(selectCartItems);
  total$: Observable<number> = this.store.select(selectCartTotal);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(CartActions.loadServerCarts());
  }

  increase(productId: number) {
    this.store.dispatch(CartActions.increaseQuantity({ productId }));
  }

  decrease(productId: number) {
    this.store.dispatch(CartActions.decreaseQuantity({ productId }));
  }

  remove(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clear() {
    this.store.dispatch(CartActions.clearCart());
  }
}
