import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { UserDataService } from 'src/app/core/store/user-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getLocalStorage } from 'src/app/shared/utils';
import { LOCAL, PATH } from 'src/app/shared/const';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string = "";
  subService: Subscription;

  constructor(private route: Router ,private productData: ProductDataService, private userData: UserDataService) { }

  ngOnInit() {
    this.fetchUsernameFromStore();
    this.fetchUsernameFromLocal();
  }

  fetchUsernameFromStore(): void {
    this.subService = this.userData.usernameProps.subscribe((res: string) => {
      if(res) this.username = res;
    })
  }

  fetchUsernameFromLocal(): void {
    const usernameLocal: string = getLocalStorage(LOCAL.ADMIN);
    if(usernameLocal) this.userData.actSetUsername(usernameLocal);
  }

  logout(): void {
    this.userData.actSetUsername('');
    localStorage.removeItem(LOCAL.ADMIN);
    this.route.navigate([PATH["ROOT"]]);
  }

  ngOnDestroy(): void {
    if(this.subService) this.subService.unsubscribe();
  }
}
