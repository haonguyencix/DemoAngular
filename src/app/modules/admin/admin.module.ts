import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CheckAdminGuard } from 'src/app/core/guard/check-admin.guard';
import { PATH } from 'src/app/shared/const';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: PATH["ROOT"], component: AdminComponent, canActivate: [CheckAdminGuard] }
]

@NgModule({
  declarations: [AdminComponent, NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
