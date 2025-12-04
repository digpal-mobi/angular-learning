import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product.model";
import { CartItem } from "../../models/cart.model";


export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);
export const addToCart = createAction('[Cart] Add To Cart', props<{ product: Product }>());
export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ productId: number }>());
export const increaseQuantity = createAction('[Cart] Increase Quantity', props<{ productId: number }>());
export const decreaseQuantity = createAction('[Cart] Decrease Quantity', props<{ productId: number }>());
export const clearCart = createAction('[Cart] Clear Cart');

// Server Carts load carts from server
export const loadServerCarts = createAction('[Cart API] Load Server Carts');
export const loadServerCartsSuccess = createAction('[Cart API] Load Server Carts Success', props<{ carts: any[] }>());
export const loadServerCartsFailure = createAction('[Cart API] Load Server Carts Failure', props<{ error: any }>());
