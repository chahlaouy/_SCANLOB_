import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { NotIconModule } from '../not-icon/not-icon.module';
import { DeclarationTheftComponent } from './declaration-theft/declaration-theft.component';
import { DeclarationOfLossComponent } from './declaration-of-loss/declaration-of-loss.component';
import { CartModule } from '../cart/cart.module';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { USER_STATE_NAME } from './state/user.selectors';
import { UserReducer } from './state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './state/user.effects';
import { LossProductsComponent } from './loss-products/loss-products.component';
import { LossProductComponent } from './loss-products/product/product.component';
import { TheftProductComponent } from './theft-products/product/product.component';
import { TheftProductsComponent } from './theft-products/theft-products.component';
import { FoundedProductsComponent } from './founded-products/founded-products.component';
import { DetailComponent } from './founded-products/detail/detail.component';



@NgModule({
  declarations: [
    AccountComponent,
    ProductComponent,
    ProductsListComponent,
    AddProductComponent,
    DeclarationTheftComponent,
    DeclarationOfLossComponent,
    ProfileComponent,
    LossProductsComponent,
    LossProductComponent,
    TheftProductComponent,
    TheftProductsComponent,
    FoundedProductsComponent,
    DetailComponent
  ],
  imports: [
    NotIconModule,
    CartModule,
    CommonModule,
    UserRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(USER_STATE_NAME, UserReducer),
    EffectsModule.forFeature([UserEffect])
  ]
})
export class UserModule { }
