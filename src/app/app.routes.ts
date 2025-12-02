import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent }
];
