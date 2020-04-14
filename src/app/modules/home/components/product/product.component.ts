import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() prod: Product = null

  constructor() { }

  ngOnInit() {
  }

}
