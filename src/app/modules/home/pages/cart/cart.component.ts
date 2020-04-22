import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/core/models/cart.model';
import { Subscription } from 'rxjs';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { setLocalStorage } from 'src/app/shared/utils';
import { LOCAL, PATH } from 'src/app/shared/const';
import { Router } from '@angular/router';
import { SweetAlert } from 'sweetalert/typings/core';
declare const swal: SweetAlert;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart[] = [];
  totalPrice: number = 0;
  goToHome: string = PATH["HOME"];
  subService: Subscription;

  constructor(private productData: ProductDataService, private route: Router) { }

  ngOnInit() {
    this.fetchCartFromStore();
    this.calcTotalPrice();
  }

  fetchCartFromStore(): void {
    this.subService = this.productData.cartProps.subscribe((res: Cart[]) => {
      if (res) this.cart = res;
    })
  }

  adjustQuantity(prodId: string, direction: number): void {
    const selectedIndex = this.cart.findIndex(el => el.product.id === prodId);
    if (selectedIndex !== -1) {
      if (direction === -1 && this.cart[selectedIndex].quantity <= 1) {
        return;
      }
      this.cart[selectedIndex].quantity += direction;
    }
    this.productData.actSetCart(this.cart);
    setLocalStorage(LOCAL.CART, this.cart);
    this.calcTotalPrice();
  }

  removeItem(prodId: string): void {
    const removed = this.cart.filter(el => el.product.id !== prodId);
    this.productData.actSetCart(removed);
    setLocalStorage(LOCAL.CART, removed);
    this.calcTotalPrice();
  }

  calcTotalPrice(): void {
    let total: number = 0;
    this.cart.forEach((item: Cart) => {
      total += item.product.price * item.quantity
    })
    this.totalPrice = total;
  }

  pay(): void {
    swal({
      title: `Tổng số tiền bạn phải trả là ${this.totalPrice}$`,
      text: "Bạn có muốn thanh toán?",
      icon: "warning",
      buttons: ["Không muốn", true],
      dangerMode: true,
    }).then((willPay) => {
      if (willPay) {
        swal("Thanh toán thành công!", {
          icon: "success",
        }).then(() => {
          this.productData.actSetCart([]);
          localStorage.removeItem(LOCAL.CART);
          this.route.navigate([PATH["HOME"]]);
        })
      } else {
        swal("Ok bạn, không thanh toán thì thôi!");
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subService) this.subService.unsubscribe();
  }
}
