import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomepageModule } from './pages/homepage/homepage.module';
import { CartModule } from './pages/cart/cart.module';
import { HeaderComponent } from './layouts/header/header.component';

const routes: Routes = [
  { path: "", component: HomeComponent, children: [
    { path: "", loadChildren: () => HomepageModule },
    { path: "cart", loadChildren: () => CartModule }
  ]}
]

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
