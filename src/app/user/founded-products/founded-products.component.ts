import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { AuthenticatedUser } from 'src/app/models/authenticated-user.model';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import { getUserFoundProducts, getUserLossProducts } from '../state/user.selectors';

@Component({
  selector: 'app-founded-products',
  templateUrl: './founded-products.component.html',
  styleUrls: ['./founded-products.component.scss'],
})
export class FoundedProductsComponent implements OnInit {

  fsUrl: any = environment.BACK_END_FILES;
  products$: Observable<any>;
  authenticatedUser$: Observable<AuthenticatedUser>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.products$ = this.store.select(getUserFoundProducts);
  }

}
