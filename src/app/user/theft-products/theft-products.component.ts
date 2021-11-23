import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { AuthenticatedUser } from 'src/app/models/authenticated-user.model';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import { getUserProducts, getUserTheftProducts } from '../state/user.selectors';

@Component({
  selector: 'app-theft-products',
  templateUrl: './theft-products.component.html',
  styleUrls: ['./theft-products.component.scss'],
})
export class TheftProductsComponent implements OnInit {

  fsUrl: any = environment.BACK_END_FILES;
  products$: Observable<any>;
  authenticatedUser$: Observable<AuthenticatedUser>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.products$ = this.store.select(getUserTheftProducts);
  }
}
