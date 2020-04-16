import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { PipeModule } from 'src/app/core/pipe/pipe.module';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
  imports: [
    CommonModule,
    PipeModule
  ]
})
export class ProductModule { }
