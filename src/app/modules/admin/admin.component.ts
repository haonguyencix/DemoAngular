import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { Product } from 'src/app/core/models/products.model';
import { Subscription } from 'rxjs';
import { SweetAlert } from 'sweetalert/typings/core';
declare const swal: SweetAlert;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isEdit: boolean = false;
  curPage: number = 1;
  id: string = '';
  name: string = '';
  image: any = '';
  price: number = 0;
  type: string = '';
  subService: Subscription;

  constructor(private productsService: ProductsService, private productData: ProductDataService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  reset(): void {
    this.isEdit = false;
  }

  fetchProducts(): void {
    this.subService = this.productsService.fetchProductsFromDB().subscribe((res: Product[]) => {
      if (res) this.products = res;
    }, err => {
      console.log("HomeComponent -> fetchProducts -> err", err);
    })
  }

  actProd(actProdForm): void {
    if (this.isEdit) {
      this.isEdit = false;
      this.subService = this.productsService.updateProductInDB(actProdForm, this.id).subscribe((res: any) => {
        swal({
          title: "Đã cập nhật sản phẩm thành công",
          icon: "success"
        })
        this.fetchProducts();
      }), err => {
        console.log("HomeComponent -> actProd -> err", err);
      }
    } else {
      this.subService = this.productsService.addProductToDB(actProdForm).subscribe((res: any) => {
        swal({
          title: "Đã thêm sản phẩm thành công",
          icon: "success"
        })
        this.fetchProducts();
      }), err => {
        console.log("HomeComponent -> actProd -> err", err);
      }
    }
    this.name = '';
    this.image = '';
    this.price = 0;
    this.type = '';
  }

  remove(id: string): void {
    this.subService = this.productsService.removeProductInDB(id).subscribe((res: any) => {
      swal({
        title: "Đã xóa sản phẩm thành công",
        icon: "success"
      })
      this.fetchProducts();
    }), err => {
      console.log("HomeComponent -> remove -> err", err);
    }
  }

  edit(id: string): void {
    this.isEdit = true;
    const found = this.products.find((prod: Product) => prod.id === id)
    this.id = found.id;
    this.name = found.name;
    this.image = found.image;
    this.price = found.price;
    this.type = found.type;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  ngOnDestroy(): void {
    if (this.subService) this.subService.unsubscribe();
  }
}
