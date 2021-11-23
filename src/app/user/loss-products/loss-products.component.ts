import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { AuthenticatedUser } from 'src/app/models/authenticated-user.model';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import { getUserLossProducts } from '../state/user.selectors';

@Component({
  selector: 'app-loss-products',
  templateUrl: './loss-products.component.html',
  styleUrls: ['./loss-products.component.scss'],
})
export class LossProductsComponent implements OnInit {

  fsUrl: any = environment.BACK_END_FILES;
  products$: Observable<any>;
  authenticatedUser$: Observable<AuthenticatedUser>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.products$ = this.store.select(getUserLossProducts);
  }

}
