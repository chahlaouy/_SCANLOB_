import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/state/auth.effects';
import { SharedEffect } from './shared/store/shared.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './state/custom.serializer';
import { AgmCoreModule } from '@agm/core';
import { AuthTokenInterceptor } from './services/auth-token.interceptor';
import { CartModule } from './cart/cart.module';
import { SettingsComponent } from './settings/settings.component';
import { ChatComponent } from './shared/chat/chat/chat.component';
import { SingleChatComponent } from './shared/chat/single-chat/single-chat.component';
import { NotIconModule } from './not-icon/not-icon.module';
import { FormsModule } from '@angular/forms';
import { SuccessMessageComponent } from './shared/components/success-message/success-message.component';
import { DisplayErrorComponent } from './shared/components/display-error/display-error.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { UserEffect } from './user/state/user.effects';
import { CartPageComponent } from './cart-page/cart-page.component';
import { EchoConfig, NgxLaravelEchoModule } from 'ngx-laravel-echo';


const authUser = JSON.parse(localStorage.getItem("authUser"))
const token = authUser ? authUser.token : null ;
export const echoConfig: EchoConfig = {
  userModel: 'users',
  notificationNamespace: 'App\\Notifications',
  options: {
      broadcaster: 'pusher',
      key: 'anyKey',
      auth: {
        headers: {
            Authorization: 'Bearer ' + token
        },
      },
      wsHost: environment.BACK_END,
      authEndpoint: `${environment.BACK_END_URL}/broadcasting/auth`,
      host: environment.BACK_END,
      wsPort: 6001,
      disableStats: true,
      // namespace: '',
      forceTLS: false,
  },
};
declare const Pusher: any;
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ChatComponent,
    SingleChatComponent,
    SuccessMessageComponent,
    DisplayErrorComponent,
    LoadingSpinnerComponent,
    CartPageComponent
  ],
  entryComponents: [],
  imports: [

    NotIconModule,
    CartModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffect, SharedEffect, UserEffect]),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDK_H25782ntfx8P1phlMxs1KngoieEaYw',
      libraries: ['places'],
      language: 'fr'

    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    NgxLaravelEchoModule.forRoot(echoConfig),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
