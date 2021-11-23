import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DeclarationOfLossComponent } from './declaration-of-loss/declaration-of-loss.component';
import { DeclarationTheftComponent } from './declaration-theft/declaration-theft.component';
import { LossProductsComponent } from './loss-products/loss-products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LossProductComponent } from './loss-products/product/product.component';
import { TheftProductsComponent } from './theft-products/theft-products.component';
import { TheftProductComponent } from './theft-products/product/product.component';


const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/add-product',
    component: AddProductComponent
  },
  {
    path: 'products/:id',
    component: ProductComponent
  },
  {
    path: 'loss-products',
    component: LossProductsComponent
  },
  {
    path: 'loss-products/declaration',
    component: DeclarationOfLossComponent
  },
  {
    path: 'loss-products/:id',
    component: LossProductComponent
  },
  {
    path: 'theft-products',
    component: TheftProductsComponent
  },
  {
    path: 'theft-products/declaration',
    component: DeclarationTheftComponent
  },
  {
    path: 'theft-products/:id',
    component: TheftProductComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}