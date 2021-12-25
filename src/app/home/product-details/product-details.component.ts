import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProductToCart } from 'src/app/shared/store/shared.actions';
import { getCartItems, getProductById } from 'src/app/shared/store/shared.selectors';
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
  items: any;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.product$ = this.store.select(getProductById);
    this.store.select(getCartItems).subscribe(items => {
      this.items = items;
    })
  }

  addProductToCart(product){
    const item = this.items.find(item => item.id === product.id);
    if(item){
      return;
    }
    this.store.dispatch(addProductToCart({product}));
  }

}
