import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { AuthenticatedUser } from 'src/app/models/authenticated-user.model';
import { getLatestProductsStart } from 'src/app/shared/store/shared.actions';
import { getLatestProducts } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  products$: Observable<any>;
  authenticatedUser$: Observable<AuthenticatedUser>;
  page: number = 1;
  fsUrl: any = environment.BACK_END_FILES;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.products$ = this.store.select(getLatestProducts)
  }

  loadMoreData(ev: any){

    if (ev == null) {
      this.page = 1;
    } else {
      this.page = this.page + 1;
      this.store.dispatch(getLatestProductsStart({page: this.page}))

    }

  }
}
