import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CheckAdminGuard } from 'src/app/core/guard/check-admin.guard';
import { PATH } from 'src/app/shared/const';

const routes: Routes = [
  { path: PATH["ROOT"], component: AdminComponent, canActivate: [CheckAdminGuard] }
]

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
