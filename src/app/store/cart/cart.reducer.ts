import { createReducer, on } from "@ngrx/store";
import { CartState } from "../../models/cart.model";
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

  
  export const initialState: CartState = {
    items: [],
    serverCarts: []
  };

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addToCart, (state, { product }) => {
        const idx = state.items.findIndex(i => i.product.id === product.id);
        if (idx === -1) {
            return {
                ...state,
                items: [...state.items, { product, quantity: 1 }]
            };
        } else {
            const items = state.items.map((it, i) => i === idx ? { ...it, quantity: it.quantity + 1 } : it);
            return { ...state, items };
        }
    }),

    on(CartActions.removeFromCart, (state, { productId }) => ({
        ...state,
        items: state.items.filter(it => it.product.id !== productId)
    })),

    on(CartActions.clearCart, (state) => ({
        ...state,
        items: []
    })),
    on(CartActions.increaseQuantity, (state, { productId }) => ({
        ...state,
        items: state.items.map(it => it.product.id === productId ? { ...it, quantity: it.quantity + 1 } : it)
    })),

    on(CartActions.decreaseQuantity, (state, { productId }) => ({
        ...state,
        items: state.items
            .map(it => it.product.id === productId ? { ...it, quantity: Math.max(0, it.quantity - 1) } : it)
            .filter(it => it.quantity > 0) // remove if quantity becomes 0
    })),

    on(CartActions.loadServerCartsSuccess, (state, { carts }) => ({
        ...state,
        items: carts,
        serverCarts: carts
    })),

)