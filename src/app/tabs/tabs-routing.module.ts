import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './categories/product-details/product-details.component';
import { ProductsComponent } from './categories/products/products.component';
import { DetailsComponent } from './list-loss-products/details/details.component';
import { ListLossProductsComponent } from './list-loss-products/list-loss-products.component';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'loss-products',
        component: ListLossProductsComponent
      },
      {
        path: 'loss-products/:id',
        component: DetailsComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/:subCatId/products',
        component: ProductsComponent
      },
      {
        path: 'categories/:subCatId/products/:id',
        component: ProductDetailsComponent
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
