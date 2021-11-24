import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoundProductsComponent } from './found-products/found-products.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'anouncement/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'found-product',
    component: FoundProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
