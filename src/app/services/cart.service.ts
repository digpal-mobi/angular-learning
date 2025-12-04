import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private BASE_URL = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getCart(cartId: number): Observable<CartItem[]> {
    return this.http.get<any>(`${this.BASE_URL}/carts/${cartId}`).pipe(
      switchMap((cartData) => {
        // 1. Check if the cart is empty or has no products
        if (!cartData.products || cartData.products.length === 0) {
          return of([]); 
        }
        const productRequests = cartData.products.map((item: any) => {
          return this.http.get<any>(`${this.BASE_URL}/products/${item.productId}`).pipe(
            map((productDetails) => ({
              product: productDetails, 
              quantity: item.quantity
            }))
          );
        });

        // 5. forkJoin runs all the product requests in parallel
        return forkJoin(productRequests) as Observable<CartItem[]>;
      })
    );
  }
}