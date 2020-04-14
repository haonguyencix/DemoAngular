import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { ProductsComponent } from '../../components/products/products.component';
import { ProductComponent } from '../../components/product/product.component';

const routes: Routes = [
  { path: "", component: HomepageComponent }
]

@NgModule({
  declarations: [HomepageComponent, ProductsComponent, ProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
