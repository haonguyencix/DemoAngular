import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { Cart } from 'src/app/core/models/cart.model';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/core/store/user-data.service';
import { getLocalStorage } from 'src/app/shared/utils';
import { LOCAL } from 'src/app/shared/const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  total: number = 0;
  username: string = "";
  subService: Subscription;

  constructor(private route: Router ,private productData: ProductDataService, private userData: UserDataService) { }

  ngOnInit() {
    this.fetchCartFromStore();
    this.fetchUsernameFromStore();
    this.fetchUsernameFromLocal();
  }

  fetchCartFromStore(): void {
    this.subService = this.productData.cartProps.subscribe((res: Cart[]) => {
      if(res) this.total = res.length;
    });
  }

  fetchUsernameFromStore(): void {
    this.subService = this.userData.usernameProps.subscribe((res: string) => {
      if(res) this.username = res;
    })
  }

  fetchUsernameFromLocal(): void {
    const usernameLocal: string = getLocalStorage(LOCAL.TOKEN);
    if(usernameLocal) this.userData.actSetUsername(usernameLocal);
  }

  logout(): void {
    this.userData.actSetUsername('');
    localStorage.removeItem(LOCAL.TOKEN);
    this.route.navigate(["/login"]);
  }

  ngOnDestroy(): void {
    if(this.subService) this.subService.unsubscribe();
  }
}
