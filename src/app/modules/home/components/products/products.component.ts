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
  filterArr: Product[] = [];
  cart: Cart[] = [];
  total: number = 0;
  curPage: number = 1;
  subService: Subscription;

  constructor(private productData: ProductDataService) { }

  ngOnInit() {
    this.fetchProductsFromStore();
    this.fetchCartFromStore();
    this.fetchFilterTypeFromStore();
  }

  fetchProductsFromStore(): void {
    this.subService = this.productData.productsProps.subscribe((res: Product[]) => {
      if (res) {
        this.products = res;
        this.filterArr = res;
        this.productData.actSetTypes(this.mappingTypes(res));
      };
    })
  }

  fetchCartFromStore(): void {
    this.subService = this.productData.cartProps.subscribe((res: Cart[]) => {
      if (res) this.cart = res;
    })
  }

  fetchFilterTypeFromStore(): void {
    this.subService = this.productData.filterTypeProps.subscribe((res: string) => {
      if (res) {
        this.filterArr = res === "all" ? this.products : this.filterTypes(res);
      }
    })
  }

  mappingTypes(productArr: Product[]): string[] {
    let typeArr: string[] = [];
    productArr.forEach((item: Product) => typeArr.push(item.type));
    return [...new Set(typeArr)];
  }

  filterTypes(type: string): Product[] {
    return this.products.filter((item: Product) => item.type === type)
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
