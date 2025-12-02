import { createReducer, on } from "@ngrx/store";
import * as ProductsActions from './products.actions';
import { Product } from "../models/product.model";

export const productsFeatureKey = 'products';

export interface ProductState {
    products: Product[];
    loading:boolean;
    error: any | null;
}

export const initialState : ProductState = {
     products: [],
  loading: false,
  error: null
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsActions.loadProducts, (state) => ({
        ...state,
        loading:true,
        error:null,
    })),
    on(ProductsActions.loadProductsSuccess, (state, {products}) => ({
        ...state,
        loading: false,
        products
    })),
    
    on(ProductsActions.loadProductsFailure, (state, {error})=> ({
        ...state,
        loading:false,
        error
    }))
)