import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/products.model';
import { Cart } from 'src/app/core/models/cart.model';
import { setLocalStorage } from 'src/app/shared/utils';
import { LOCAL } from 'src/app/shared/const';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cart: Cart[] = [];
  total: number = 0;
  subService: Subscription;

  constructor(private productData: ProductDataService) { }

  ngOnInit() {
    this.fetchProductsFromStore();
    this.fetchCartFromStore();
  }

  fetchProductsFromStore(): void {
    this.subService = this.productData.productsProps.subscribe((res: Product[]) => {
      if (res) this.products = res;
    })
  }

  fetchCartFromStore(): void {
    this.subService = this.productData.cartProps.subscribe((res: Cart[]) => {
      if (res) this.cart = res;
    })
  }

  putToCart(prod: Product): void {
    const cartItem: Cart = {
      product: prod,
      quantity: 1
    }
    const selectedIndex = this.cart.findIndex(el => el.product.id === prod.id);
    if (selectedIndex !== -1) {
      this.cart[selectedIndex].quantity++
    } else {
      this.cart.push(cartItem);
    }
    this.productData.actSetCart(this.cart)
    setLocalStorage(LOCAL.CART, this.cart);
  }

  ngOnDestroy(): void {
    if (this.subService) this.subService.unsubscribe();
  }
}
