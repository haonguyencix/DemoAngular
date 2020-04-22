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
  
  public addProductToDB(prod: Product): Observable<Product[]> {
    let observable: Observable<any> = this.http.post(API.products.fetchProducts, prod);
    return observable;
  }

  public removeProductInDB(prodId: string): Observable<Product[]> {
    let observable: Observable<any> = this.http.delete(API.products.updateProducts(prodId));
    return observable;
  }

  public updateProductInDB(prod: Product, prodId: string): Observable<Product[]> {
    let observable: Observable<any> = this.http.put(API.products.updateProducts(prodId), prod);
    return observable;
  }
}
