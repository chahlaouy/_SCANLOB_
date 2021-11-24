import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { autoLogin } from './auth/state/auth.actions';
import { getAuthenticatedUser } from './auth/state/auth.selectors';
import { AuthenticatedUser } from './models/authenticated-user.model';
import { getCategoriesStart, getLossProductsStarts, getLatestProductsStart, setLoadingSpinner } from './shared/store/shared.actions';
import { getErrorMessage, getLoadingSpinnerState, getSuccessMessage } from './shared/store/shared.selectors';
import { AppState } from './state/app.state';
import { getLossProductsStart, getProductsStart } from './user/state/user.actions';
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
    { title: 'Acceuil', url: '/', icon: 'home' },
    { title: 'Mon compte', url: '/user/account', icon: 'person' },
    { title: 'Boîte de réception', url: '/chat', icon: 'chatbubbles' },
    { title: 'Mes produits', url: '/user/products', icon: 'cube' },
    { title: 'Objets perdus', url: '/user/loss-products', icon: 'remove-circle' },
    { title: 'Objets volu', url: '/user/theft-products', icon: 'warning' },
    { title: 'Objets trouvé', url: '/user/found-products', icon: 'cube' },
    { title: 'Se déconnecter', url: '/folder/Trash', icon: 'log-out' },
  ];

  constructor(
    private store: Store<AppState>,
  ) {}
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
      this.authUserId =  user.user.userId;
    });
    this.spinner$ = this.store.select(getLoadingSpinnerState);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.successMessage$  = this.store.select(getSuccessMessage);
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(getLatestProductsStart({page: 1}));
    this.store.dispatch(getCategoriesStart());
    this.store.dispatch(getLossProductsStarts());


  }


}
