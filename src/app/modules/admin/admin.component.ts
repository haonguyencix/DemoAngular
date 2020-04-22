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

  clearForm(): void {
    this.name = '';
    this.image = '';
    this.price = 0;
    this.type = '';
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
      this.subService = this.productsService.updateProductInDB(actProdForm, this.id).subscribe((res: any) => {
        swal({
          title: "Đã cập nhật sản phẩm thành công",
          icon: "success"
        })
        this.isEdit = false;
        this.clearForm();
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
        this.clearForm();
        this.fetchProducts();
      }), err => {
        console.log("HomeComponent -> actProd -> err", err);
      }
    }
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

  edit(prod: Product): void {
    this.isEdit = true;
    this.id = prod.id;
    this.name = prod.name;
    this.image = prod.image;
    this.price = prod.price;
    this.type = prod.type;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  ngOnDestroy(): void {
    if (this.subService) this.subService.unsubscribe();
  }
}
