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
import { ChatComponent } from '../shared/chat/chat/chat.component';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { PaymentPageComponent } from '../payment-page/payment-page.component';


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
    ProductDetailsComponent,
    ChatComponent,
    CartPageComponent,
    PaymentPageComponent
  ]
})
export class TabsPageModule {}
