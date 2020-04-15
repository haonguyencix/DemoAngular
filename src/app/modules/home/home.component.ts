import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/products.model';
import { Cart } from 'src/app/core/models/cart.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { Subscription } from 'rxjs';
import { getLocalStorage } from 'src/app/shared/utils';
import { LOCAL } from 'src/app/shared/const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subService: Subscription;

  constructor(private productsService: ProductsService, private productData: ProductDataService) { }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCartFromLocal();
  }

  fetchProducts(): void {
    this.subService = this.productsService.fetchProductsFromDB().subscribe((res: Product[]) => {
      if (res) this.productData.actFetchProducts(res);
    }, err => {
      console.log("HomeComponent -> fetchProducts -> err", err);
    })
  }

  fetchCartFromLocal(): void {
    const cartLocal: Cart[] = getLocalStorage(LOCAL.CART);
    if (cartLocal) {
      this.productData.actSetCart(cartLocal);
    }
  }

  ngOnDestroy(): void {
    if (this.subService) this.subService.unsubscribe();
  }
}
