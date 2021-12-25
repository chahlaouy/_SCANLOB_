import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLossProductsStarts, setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { getLatestLossProducts } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-loss-products',
  templateUrl: './list-loss-products.component.html',
  styleUrls: ['./list-loss-products.component.scss'],
})
export class ListLossProductsComponent implements OnInit {

  lossProducts$: Observable<any>;
  fsUrl: any = environment.BACK_END_FILES;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(getLossProductsStarts());
    this.lossProducts$ = this.store.select(getLatestLossProducts);
  }

}
