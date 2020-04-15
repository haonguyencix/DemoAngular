import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { API } from '../config/setting';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public fetchProductsFromDB(): Observable<Product[]> {
    let observable: Observable<any> = this.http.get(API.products.fetchProducts);
    return observable;
  }
}
