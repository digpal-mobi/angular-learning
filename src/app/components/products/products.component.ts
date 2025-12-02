import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import * as ProductsActions from "../../store/products.actions"
import * as ProductsSelectors from "../../store/products.selectors"
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(ProductsSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductsSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductsSelectors.selectProductsError);
    this.store.dispatch(ProductsActions.loadProducts());
  }

   trackById(index: number, item: Product) {
    return item.id;
  }

   handleAddToCart(product: Product) {
    console.log('Add to cart', product);
  }
}
