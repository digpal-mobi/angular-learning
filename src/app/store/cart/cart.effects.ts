// src/app/store/cart/cart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { withLatestFrom, tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartItems } from './cart.selectors';
import { CartService } from '../../services/cart.service';

@Injectable()
export class CartEffects {
  // Persist local cart to localStorage whenever cart changes
  persistLocal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CartActions.addToCart,
        CartActions.removeFromCart,
        CartActions.increaseQuantity,
        CartActions.decreaseQuantity,
        CartActions.clearCart
      ),
      withLatestFrom(this.store.select(selectCartItems)),
      tap(([action, items]) => {
        try {
          localStorage.setItem('app_cart', JSON.stringify(items));
        } catch (e) {
          console.error('Failed to persist cart', e);
        }
      })
    ),
    { dispatch: false }
  );

  loadLocalCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      map(() => {
        try {
          const raw = localStorage.getItem('app_cart');
          const items = raw ? JSON.parse(raw) : [];
          // console.debug('loadLocalCart$', items);
          return CartActions.loadCartSuccess({ items });
        } catch (e) {
          console.error('Failed to read local cart', e);
          return CartActions.loadCartSuccess({ items: [] });
        }
      })
    )
  );

  // loadServerCarts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActions.loadServerCarts),
  //     switchMap(() =>
  //       this.cartService.getCart(1).pipe(
  //         map((items) => CartActions.loadServerCartsSuccess({ carts: items })),
  //         catchError((error) => {
  //           console.error('loadServerCarts$ failed', error);
  //           return of(CartActions.loadServerCartsFailure({ error }));
  //         })
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private store: Store,
    private cartService: CartService
  ) {}
}
