import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartFeatureKey } from './cart.reducer';
import { CartItem, CartState } from '../../models/cart.model';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartCount = createSelector(
  selectCartItems,
  (items: CartItem[]) => items.reduce((sum, it) => sum + it.quantity, 0)
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items: CartItem[]) =>
    items.reduce((sum, it) => sum + it.quantity * it.product.price, 0)
);

export const selectCartItemById = (id: number) =>
  createSelector(selectCartItems, (items) =>
    items.find((i) => i.product.id === id)
);

export const selectServerCarts = createSelector(selectCartState, (state) => state.serverCarts);
