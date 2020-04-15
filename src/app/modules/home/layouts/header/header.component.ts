import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { Cart } from 'src/app/core/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  total: number = 0;

  constructor(private productData: ProductDataService) { }

  ngOnInit() {
    this.productData.cartProps.subscribe((res: Cart[]) => {
      this.total = res.length;
    });
  }
}
