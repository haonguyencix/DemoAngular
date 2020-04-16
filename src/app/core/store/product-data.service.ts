import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private products = new BehaviorSubject([] as Product[]);
  productsProps = this.products.asObservable();

  private cart = new BehaviorSubject([] as Cart[]);
  cartProps = this.cart.asObservable();

  private types = new BehaviorSubject([] as string[]);
  typesProps = this.types.asObservable();

  private filterType = new BehaviorSubject('' as string);
  filterTypeProps = this.filterType.asObservable();

  constructor() { }

  actFetchProducts(productsData: Product[]): void {
    this.products.next(productsData);
  }

  actSetCart(cartData: Cart[]): void {
    this.cart.next(cartData);
  }

  actSetTypes(typesData: string[]): void {
    this.types.next(typesData);
  }

  actSetFilterType(filterTypeData: string): void {
    this.filterType.next(filterTypeData);
  }
}
