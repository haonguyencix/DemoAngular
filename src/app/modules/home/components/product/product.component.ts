import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() prod: Product = null;
  @Output() putToCart = new EventEmitter;
  @Output() adjustQuantity = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  _adjustQuantity(prodId: string, direction: number) {
    this.adjustQuantity.emit({ prodId, direction });
  }

  _putToCart(prod: Product): void {
    this.putToCart.emit(prod);
  }
}
