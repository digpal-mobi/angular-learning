import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsFeatureKey, productsReducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';
import { HttpClientModule } from '@angular/common/http';
import { CartEffects } from './store/cart/cart.effects';
import { cartFeatureKey, cartReducer } from './store/cart/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({[productsFeatureKey]: productsReducer, [cartFeatureKey]: cartReducer}),
    provideEffects([ProductsEffects, CartEffects]), 
    importProvidersFrom(HttpClientModule),]
};
