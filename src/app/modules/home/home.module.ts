import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomepageModule } from './pages/homepage/homepage.module';
import { CartModule } from './pages/cart/cart.module';
import { HeaderComponent } from './layouts/header/header.component';
import { CheckHomeGuard } from 'src/app/core/guard/check-home.guard';
import { PATH } from 'src/app/shared/const';

const routes: Routes = [
  { path: PATH["ROOT"], component: HomeComponent, children: [
    { path: PATH["ROOT"], loadChildren: () => HomepageModule },
    { path: PATH["CART"], loadChildren: () => CartModule }
  ], canActivate: [CheckHomeGuard]}
]

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
