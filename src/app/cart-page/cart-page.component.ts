import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeProductFromCart } from 'src/app/shared/store/shared.actions';
import { getCartItems, getCartItemsNumber } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {

  products$: Observable<any>;
  number: number = 0;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(getCartItems);
    this.store.select(getCartItemsNumber).subscribe(num => {
      this.number = num;
    })
  }
  removeItemFromCart(id){
    this.store.dispatch(removeProductFromCart({id}));
  }
  makePayment(){

  }

}
