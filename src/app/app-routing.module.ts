import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatComponent } from './shared/chat/chat/chat.component';
import { SingleChatComponent } from './shared/chat/single-chat/single-chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./user/user.module').then( m => m.UserModule)
  // },
  // {
  //   path: 'cart-page',
  //   component: CartPageComponent
  // },
  // {
  //   path: 'checkout',
  //   component: PaymentPageComponent
  // },
  // {
  //   path: 'settings',
  //   component: SettingsComponent
  // },
  // {
  //   path: 'chat',
  //   component: ChatComponent
  // },
  {
    path: 'chat/:id',
    component: SingleChatComponent
  },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
