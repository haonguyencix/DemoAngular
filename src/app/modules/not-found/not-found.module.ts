import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { PATH } from 'src/app/shared/const';

const routes: Routes = [
  { path: PATH["ROOT"], component: NotFoundComponent }
]

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
