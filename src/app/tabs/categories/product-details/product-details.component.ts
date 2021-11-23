import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProductToCart } from 'src/app/shared/store/shared.actions';
import { getProductById, getSubcategoryProduct } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  product$: Observable<any>;
  fsUrl: any = environment.BACK_END_FILES;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.product$ = this.store.select(getSubcategoryProduct)
  }

  addProductToCart(product){
    this.store.dispatch(addProductToCart({product}));
  }

}
