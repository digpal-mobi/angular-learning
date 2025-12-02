import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   private API = 'https://fakestoreapi.com/products';

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }
}
