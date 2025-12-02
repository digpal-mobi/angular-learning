import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsFeatureKey, productsReducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({[productsFeatureKey]: productsReducer}),
    provideEffects([ProductsEffects]), 
    importProvidersFrom(HttpClientModule),]
};
