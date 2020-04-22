import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CheckHomeGuard } from 'src/app/core/guard/check-home.guard';
import { PATH } from 'src/app/shared/const';

const routes: Routes = [
  { path: PATH["ROOT"], component: LoginComponent, canActivate: [CheckHomeGuard] }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
