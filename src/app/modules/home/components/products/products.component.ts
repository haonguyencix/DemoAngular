import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  subService: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.subService = this.productsService.fetchProducts().subscribe((res: Product[]) => {
      this.products = res;
    }, err => {
      console.log("ProductsComponent -> fetchProducts -> err", err)
    })
  }

  ngOnDestroy(): void {
    if(this.subService) this.subService.unsubscribe();
  }
}
