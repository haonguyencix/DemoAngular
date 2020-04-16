import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { ProductsModule } from '../../components/products/products.module';
import { ToolbarComponent } from '../../layouts/toolbar/toolbar.component';

const routes: Routes = [
  { path: "", component: HomepageComponent }
]

@NgModule({
  declarations: [HomepageComponent, ToolbarComponent],
  imports: [
    CommonModule,
    ProductsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
