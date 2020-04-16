import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutPipe } from './shortcut.pipe';

@NgModule({
  declarations: [ShortcutPipe],
  exports: [ShortcutPipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
