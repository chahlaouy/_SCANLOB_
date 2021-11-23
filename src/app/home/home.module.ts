import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NotIconModule } from '../not-icon/not-icon.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from '../tabs/categories/products/products.component';
import { CategoriesComponent } from '../tabs/categories/categories.component';
import { CartModule } from '../cart/cart.module';



@NgModule({
  declarations: [
    HomePageComponent,
    ProductDetailsComponent,
  ],
  imports: [
    NotIconModule,
    CartModule,
    CommonModule,
    IonicModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
