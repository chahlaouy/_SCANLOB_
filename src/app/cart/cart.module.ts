import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { IonicModule } from '@ionic/angular';
import { CartPageComponent } from '../cart-page/cart-page.component';

@NgModule({
  declarations: [
    CartIconComponent,
  ],
  exports: [
    CartIconComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CartModule { }
