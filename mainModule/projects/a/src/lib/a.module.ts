import { NgModule } from '@angular/core';
import { AComponent } from './a.component';
import { BModule } from 'b';

@NgModule({
  imports: [
    BModule
  ],
  declarations: [AComponent],
  exports: [AComponent]
})
export class AModule { }
