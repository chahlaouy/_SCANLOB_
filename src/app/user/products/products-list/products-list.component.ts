import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { AuthenticatedUser } from 'src/app/models/authenticated-user.model';
import { AppState } from 'src/app/state/app.state';
import { getUserProducts } from '../../state/user.selectors';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  fsUrl: any = environment.BACK_END_FILES;
  products$: Observable<any>;
  authenticatedUser$: Observable<AuthenticatedUser>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.products$ = this.store.select(getUserProducts);

  }

}
