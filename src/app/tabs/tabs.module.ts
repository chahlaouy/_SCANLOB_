import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { CategoriesComponent } from './categories/categories.component';
import { ListLossProductsComponent } from './list-loss-products/list-loss-products.component';
import { ProductsComponent } from './categories/products/products.component';
import { DetailsComponent } from './list-loss-products/details/details.component';
import { CartModule } from '../cart/cart.module';
import { ProductDetailsComponent } from './categories/product-details/product-details.component';


@NgModule({
  imports: [
    CommonModule,
    CartModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
  ],
  declarations: [
    TabsPage,
    CategoriesComponent,
    ListLossProductsComponent,
    ProductsComponent,
    DetailsComponent,
    ProductDetailsComponent
  ]
})
export class TabsPageModule {}
