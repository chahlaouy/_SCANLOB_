import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NotIconModule } from '../not-icon/not-icon.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartModule } from '../cart/cart.module';
import { FoundProductsComponent } from './found-products/found-products.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePageComponent,
    ProductDetailsComponent,
    FoundProductsComponent
  ],
  imports: [
    NotIconModule,
    CartModule,
    FormsModule,
    CommonModule,
    IonicModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
