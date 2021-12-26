import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EchoService } from 'ngx-laravel-echo';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { autoLogin, logout } from './auth/state/auth.actions';
import { getAuthenticatedUser } from './auth/state/auth.selectors';
import { AuthenticatedUser } from './models/authenticated-user.model';
import { getCategoriesStart, getLossProductsStarts, getLatestProductsStart, setLoadingSpinner } from './shared/store/shared.actions';
import { getErrorMessage, getLoadingSpinnerState, getSuccessMessage } from './shared/store/shared.selectors';
import { AppState } from './state/app.state';
import { getBankAccountStart, getChatroomsStart, getLossProductsStart, getProductsStart, getSingleChatroomsSuccess, resetFeilds, sendMessageSuccess } from './user/state/user.actions';
import { getUserChatrooms } from './user/state/user.selectors';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{

  spinner$: Observable<boolean>;
  errorMessage$: Observable<any>;
  successMessage$ : Observable<any>;
  authenticatedUser$: Observable<AuthenticatedUser>;

  authUserId: any;

  public appPages = [
    { title: 'Accueil', url: '/', icon: 'home' },
    { title: 'Mon compte', url: '/tabs/user/account', icon: 'person' },
    { title: 'Boîte de réception', url: '/tabs/chat', icon: 'chatbubbles' },
    { title: 'Mes produits', url: '/tabs/user/products', icon: 'cube' },
    { title: 'Objets perdus', url: '/tabs/user/loss-products', icon: 'remove-circle' },
    { title: 'Objets volés', url: '/tabs/user/theft-products', icon: 'warning' },
    { title: 'Objets trouvés', url: '/tabs/user/found-products', icon: 'cube' },
  ];

  chatrooms: any;
  constructor(
    private store: Store<AppState>,
    // private echoService: EchoService,
  ) {}
  // Hide the splash (you should do this on app launch)
  async hideSplash(){

    await SplashScreen.hide();
  }
  async showSplash(){
    // Show the splash for two seconds and then automatically hide it:
    await SplashScreen.show({
      autoHide: false
    });
  }
  async showSplashForTime(){
    // Show the splash for an indefinite amount of time:
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
  }
  ngOnInit(){
    this.store.dispatch(autoLogin());
    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.store.select(getAuthenticatedUser).subscribe(user => {
      if(!user){
        return;
      }
      this.store.dispatch(setLoadingSpinner({status: true}));
      this.store.dispatch(getProductsStart());
      this.store.dispatch(getLossProductsStart());
      this.store.dispatch(getChatroomsStart());
      this.store.dispatch(getBankAccountStart());
      this.authUserId =  user.user.userId;
    });
    this.spinner$ = this.store.select(getLoadingSpinnerState);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.successMessage$  = this.store.select(getSuccessMessage);
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(getLatestProductsStart({page: 1}));
    this.store.dispatch(getCategoriesStart());
    this.store.dispatch(getLossProductsStarts());
    this.store.select(getUserChatrooms).subscribe( chatrooms => {
      this.chatrooms = chatrooms;
      // this.subscribeToChatrooms();
    });

    // this.echoService
    //   .join(`new-chatroom.${this.authUserId}`, 'public')
    //   .listen(`new-chatroom.${this.authUserId}`, 'NewChatroom')
    //   .subscribe((chatroom) => {
    //     console.log(chatroom);
    //     this.store.dispatch(getSingleChatroomsSuccess({chatroom: chatroom.chatroom}))
    //     this.store.dispatch(getLossProductsStart())
    // });

  }

  // subscribeToChatrooms(){
  //   this.chatrooms.forEach(chatroom => {

  //     this.echoService
  //       .join(`chatroom.${chatroom.id}`, 'public')
  //       .listen(`chatroom.${chatroom.id}`, 'ChatEvent')
  //       .subscribe((message) => {
  //         console.log(message);
  //         this.store.dispatch(sendMessageSuccess({message: message.message}))
  //       });
  //   });
  // }
  logout(){
    this.store.dispatch(logout());
    this.store.dispatch(resetFeilds());
  }

}
